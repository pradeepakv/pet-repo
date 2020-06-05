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
    colour: Joi.string().required().description('Pets colour')
  }),
  {
    stripUnknown: true // not validated array items are removed
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
router.get(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    colour: Joi.string().required().description('Pets colour')
  }),
  {
    stripUnknown: true // not validated array items are removed
  }),
  async (req, res, next) => {
  try {
    const pets = await Pet.find();
    res.json(pets)
  } catch (err) {
    next(err);
  }
});


// Delete All Pets
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) res.status(404).send("No Pet item found");
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
module.exports = router;