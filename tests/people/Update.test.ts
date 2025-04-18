import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('people - update', () => {
  it('should occur param and body error', async () => {
    const res = await testServer.put('/pessoas/-1');
    expect(res.body).toHaveProperty('errors.params');
    expect(res.body).toHaveProperty('errors.body');
  });
  it('should return a 200 status and update text', async () => {
    const res = await testServer.put('/pessoas/1').send({
      id: 1,
      nome: 'Matheus',
      email: 'matheuscarissordi@gmail.com',
    });
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty('id');
  });
});
