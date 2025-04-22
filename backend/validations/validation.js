const Joi = require("joi");

const workoutValidationSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.number().integer().positive().required(),
  equipment: Joi.string().allow("").optional()
});

module.exports = { workoutValidationSchema };
