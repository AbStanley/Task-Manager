// test cases
const supertest = require('supertest');

const { app } = require('../app');

describe('Root Page', () => {

  it('should have a root page', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /^text\/html/);
  });

  it('should have "Comp 431 Project 1" in the root page', () => {
    return supertest(app)
      .get('/')
      .then(res => {
        expect(res.text).toMatch(/Comp 431 Project 1/);
      });
  });

});

describe('To-Do List', () => {

  it('should have a To-Do List page', () => {
    return supertest(app)
      .get('/todo/')
      .expect(200)
      .expect('Content-Type', /^text\/html/);
  });

  it('should initially report no To-Do items', () => {
    return supertest(app)
      .get('/todo/')
      .then(res => {
        expect(res.text).toMatch(/No to-do items/);
      });
  });

});

describe('Saving items', () => {

  it('should return a 303', () => {
    return supertest(app)
      .post('/todo/save')
      .send({ item: 'Walk the dog' })
      .expect(303)
      .expect('Location', /^(\.|\/todo\/?)$/);
  });

  it('should show items added in subsequent requests', async () => {
    const agent = supertest.agent(app);

    await agent
      .post('/todo/add')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ item: 'Walk the dog'});

    let res = await agent.get('/todo/');
    expect(res.text).toMatch(/Walk the dog/);

    await agent
      .post('/todo/add')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ item: 'Wash the dishes' });

    res = await agent.get('/todo/');
    expect (res.text).toMatch(/Walk the dog[^]*Wash the dishes/);
  });

});