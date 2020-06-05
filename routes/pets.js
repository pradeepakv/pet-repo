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
    const pets = await Pet.find(req.body);
    res.json(pets)
  } catch (err) {
    next(err);
  }
});


// Delete All Pets
router.delete("/", async (req, res, next) => {
  try {
    await res.pet.deleteOne(req.body);
    console.log("req c p delete1="+JSON.stringify(req));
    console.log("req c p delete2="+JSON.stringify(res));
    res.json({ message: "Pet has been deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;