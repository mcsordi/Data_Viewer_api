import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('people - delete', () => {
  it('Should occur a not found route error', async () => {
    const res = await testServer.delete('/pessoas');
    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
  it('Should occur wrong id param error', async () => {
    const res = await testServer.delete('/pessoas/-1');
    expect(res.body).toHaveProperty('errors.params');
  });
  it('Should return a 200 status and delete text', async () => {
    const res = await testServer.delete('/pessoas/1');
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toBe('Deletado');
  });
});
