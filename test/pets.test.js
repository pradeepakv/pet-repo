const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
//var expect = require('chai').expect;

const app = require('../app');
const expect = chai.expect;
var should = chai.should()
//var assert = chai.assert

chai.use(chaiAsPromised);

describe('functional - Pets', () => {

  // CREATE PET - should fail to create a pet without a name
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      name: '',
      age: '2',
      colour: 'white'
    });
    expect(res.status).to.equal(400);
    //console.log("response c p ="+JSON.stringify(res));
    expect(res.body.message).to.equal('"name" is not allowed to be empty');
  });

  // CREATE PET - should fail to create a pet when age is not a number
  it('should fail to create a pet when age is not a number', async () => {
    const res = await request(app).post('/pets').send({
      name: 'Dog',
      age: 'nan',
      colour: 'white'
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"age" must be a number');
  });

  // CREATE PET - should create a pet Successfully
  it('should create a pet ', async () => {
    const pet = {
      name: 'Dog',
      age: 2,
      colour: 'white'
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });

 // GET PET - should retrieve a pet
  it('should retrieve a pet', async () => {
    const pet = {
      name: 'Dog',
      age: 3,
      colour: 'white'
    };
    const res = await request(app).get('/pets').send(pet);
    console.log("response c p get="+JSON.stringify(res));
    expect(res.status).to.equal(200);
  });


 // GET PET - Add a negative test while adding pet without color
  it('should fail to retrieve a pet when all 3 properties are not present', async () => {
    const pet = {
      name: 'Dog',
      age: 3
    };
    const res = await request(app).get('/pets').send(pet);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"colour" is required');
  });

  // DELETE PET - should remove a pet
  it('should remove a pet', async () => {
    const pet = {
      name: 'Dog',
      age: 2,
      colour: 'white'
    };
    const res = await request(app).get('/pets').send(pet);
    console.log("response c p delete="+JSON.stringify(res));
    expect(res.status).to.equal(200);
  });

  
});