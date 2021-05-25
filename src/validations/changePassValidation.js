const Joi = require("joi");

const changePassValidation = (data) => {
    const schema = Joi.object().keys({
        curPassword: Joi.string().min(6).max(1024),
        newPassword: Joi.string().min(6).max(1024),
    });

    return schema.validate(data);
};

module.exports = changePassValidation;
