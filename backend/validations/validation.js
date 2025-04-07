const Joi = require("joi");

const workoutValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  category: Joi.string().required(),
  duration: Joi.number().min(1).required(),
  equipment: Joi.string().required(),
  difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
  createdBy: Joi.string().optional(),
});

module.exports = { workoutValidationSchema };
