const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const validationSchema = Joi.object({
    name: Joi.string().min(2).max(20).alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(10).required(),
  });

  const validationResult = validationSchema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

const changeContactValidation = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const validationSchema = Joi.object({
    name: Joi.string().min(2).max(20).alphanum(),
    email: Joi.string().email(),
    phone: Joi.string().min(3).max(10),
  });

  const validationResult = validationSchema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

module.exports = {
  addContactValidation,
  changeContactValidation,
};
