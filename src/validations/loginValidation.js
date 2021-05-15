const Joi = require("joi");

const loginValidation = (data) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().min(6),
        password: Joi.string().min(6).max(1024),
    });

    return schema.validate(data);
};

module.exports = loginValidation;
