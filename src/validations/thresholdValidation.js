const Joi = require("joi");

const thresholdValidation = (data) => {
    const theme = Joi.object().keys({
        temp: Joi.number().min(0).max(200),
        humid: Joi.number().min(0).max(100),
        speakerFreq: Joi.number().min(500).max(3000),
    });

    return theme.validate(data);
};

module.exports = thresholdValidation;
