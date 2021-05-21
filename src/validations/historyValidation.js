const Joi = require("joi");

const historyValidation = (data) => {
    const schema = Joi.object().keys({
        minTemp: Joi.number().min(0).max(50),
        maxTemp: Joi.number().min(0).max(50),
        minHumid: Joi.number().min(20).max(90),
        maxHumid: Joi.number().min(20).max(90),
        speaker: Joi.boolean(),
    });

    return schema.validate(data);
};

module.exports = historyValidation;
