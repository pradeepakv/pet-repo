const express = require('express');
const Joi = require('@hapi/joi');

const User = require('../models/users');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    firstName: Joi.string().required().description('Users first name'),
    lastName: Joi.string().required().description('Users last name'),
    age: Joi.number().integer().required().description('Users age'),
    profession: Joi.string().default('unemployed'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;