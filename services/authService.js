const crypto = require('crypto');
const User = require('../models/User');
const db = require('../config/postgres');

const { hashPassword, comparePassword } = require('../utils/password');

const {
    generateAccessToken,
    generateRefreshToken
} = require('../utils/token');


// REGISTER USER
const registerUser = async (userData) => {
    let user;

    try {
        const passwordHash = await hashPassword(userData.password);

        user = await User.create({
            fullName: userData.fullName,
            email: userData.email,
            passwordHash,
            role: userData.role || 'buyer',
            isEmailVerified: false
        });

        // Create the user's PostgreSQL wallet
        await db('accounts').insert({
            id: crypto.randomUUID(),
            owner_id: user._id.toString(),
            account_type: 'USER_WALLET',
            currency: 'NGN',
            status: 'active'
        });

        return {
            userId: user._id,
            message: 'Registration successful. Verify your email to continue.'
        };

        } catch (error) {
        // Remove the MongoDB user if wallet creation fails.
        if (user) {
            await User.findByIdAndDelete(user._id);
        }

        if (error.code === 11000) {
            throw new Error('Email address is already registered');
        }

        throw error;
    }
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user || !(await comparePassword(password, user.passwordHash))) {
        throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
        throw new Error('Please verify your email before logging in');
    }

    if (user.status !== 'active') {
        throw new Error('Your account is not active');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

     // Store only a hash of the refresh token.
    const tokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

    user.refreshSessions.push({
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revokedAt: null
    });

    await user.save();

    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken
    };
};

module.exports = {
    registerUser,
    loginUser
};