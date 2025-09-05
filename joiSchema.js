import Joi from "joi";

export const donJoiSchema = Joi.object({
  don: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});