const Joi = require("joi");

const changeInfoValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(6).max(50),
        email: Joi.string().email().min(6),
        phone: Joi.string()
            .pattern(/[0-9]*/)
            .min(9)
            .max(11),
    });

    return schema.validate(data);
};

module.exports = changeInfoValidation;
