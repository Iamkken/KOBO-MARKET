const {
    registerUser,
    loginUser
} = require('../services/authService');

const {
    registerSchema,
    loginSchema
} = require('../utils/authValidation');

// REGISTER
const register = async (req, res, next) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const result = await registerUser(value);

        return res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};

// LOGIN
const login = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const result = await loginUser(
            value.email,
            value.password
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};