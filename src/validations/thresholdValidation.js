const Joi = require("joi");

const thresholdValidation = (data) => {
    const theme = Joi.object().keys({
        minTemp: Joi.number().min(0).max(200),
        maxTemp: Joi.number().min(0).max(200),
        minHumid: Joi.number().min(0).max(100),
        maxHumid: Joi.number().min(0).max(100),
        speakerFreq: Joi.number().min(500).max(3000),
    });

    return theme.validate(data);
};

module.exports = thresholdValidation;
