const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().min(6),
        password: Joi.string().min(6).max(1024),
        phone: Joi.string()
            .pattern(/[0-9]*/)
            .min(9)
            .max(11),
        isAdmin: Joi.boolean(),
    });

    return schema.validate(data);
};

module.exports = registerValidation;
