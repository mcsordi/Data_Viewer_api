import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('people - Create', () => {
  it('Should return a 200 status after create', async () => {
    const res = await testServer
      .post('/pessoas')
      .send({ id: 50, nome: 'testes', email: 'testes@gmail.com' });
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty('id');
  });
  it('Should return an error because of invalid body', async () => {
    const res = await testServer
      .post('/pessoas')
      .send({ nome: 'te', email: 'testes' });
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });
});
