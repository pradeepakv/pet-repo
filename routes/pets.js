const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    colour: Joi.string().required().description('Pets colour'),
  }),
  {
    stripUnknown: true, // not validated array items are removed
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);


// Get All Pets
router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.find(req.body)
    res.json(pets)
  } catch (err) {
    next(err);
  }
});


// Delete All Pets
router.delete("/", async (req, res, next) => {
  try {
    await res.pet.deleteOne(req.body);
    res.json({ message: "Pet has been deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;