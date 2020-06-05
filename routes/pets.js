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


/*router.get('/', async (req, res) => {
  res.json(req.body);
  res.send('Get Pets');
})*/

// Get All Pets
router.get("/", async (req, res) => {
  console.log("get pet data = "+req);
  try {
    const pets = await Pet.find()
    res.json(pets)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.delete("/", async (req, res) => {
  try {
    await res.pet.deleteOne();
    res.json({ message: "Pet has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;