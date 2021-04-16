const Joi = require('joi');

const validateForm = (schema) => (data) => {
    const validation = schema.validate(data);

    if (validation.error) {
        throw new Error(validation.error);
    }
};

const appointmentSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    birthday: Joi.date().required(),
    vaccineDay: Joi.date().required(),
    vaccineTime: Joi.date().required(),
    appointmentDone: Joi.boolean(),
    observation: Joi.string(),
});

module.exports = {
    appointmentSchema,
    validateForm,
};