const Joi = require("joi");

const historyValidation = (data) => {
    const schema = Joi.object().keys({
        temp: Joi.number().min(0).max(200),
        humid: Joi.number().min(0).max(100),
        speaker: Joi.boolean(),
        time: Joi.date(),
    });

    return schema.validate(data);
};

module.exports = historyValidation;
