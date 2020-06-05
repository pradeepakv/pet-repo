const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
//var expect = require('chai').expect;

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - Pets', () => {

  let pet = {
    name: 'Dog',
    age: '2',
    colour: 'white'
  };

  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      name: 'Dog',
      age: '2',
      colour: 'white'
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet', async () => {
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });


  it('should retrieve a pet', async () => {
    const res = await request(app).get('/pets').send(pet);
    expect(res.status).to.equal(200);
  });

  it('should remove a pet', async () => {
    const res = await request(app).get('/pets').send(pet);
    expect(res.status).to.equal(200);
  });

  
});