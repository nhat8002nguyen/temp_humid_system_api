const Joi = require("joi");

const thresholdValidation = (data) => {
    const theme = Joi.object().keys({
        temp: Joi.number().min(0).max(100),
        humid: Joi.number().min(0).max(100),
    });

    return theme.validate(data);
};

module.exports = thresholdValidation;
