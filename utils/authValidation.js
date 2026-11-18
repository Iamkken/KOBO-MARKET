const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),

    email: Joi.string().email().required(),

    phone: Joi.string()
    .pattern(/^[0-9+]{10,15}$/)
    .required(),

    password: Joi.string()
        .min(8)
        .max(72)
        .required(),

    role: Joi.string()
        .valid('buyer', 'vendor')
        .default('buyer')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};