const joi = require("joi");

exports.registerValidation = (data) => {
  const validationSchema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(6).required(),
  });

  return validationSchema.validate(data);
};

exports.loginValidation = (data) => {
  const validationSchema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(6).required(),
  });

  return validationSchema.validate(data);
};
