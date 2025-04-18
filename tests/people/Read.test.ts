import { testServer } from '../jest.setup';

describe('people - read', () => {
  it('should get people by id and return getById text', async () => {
    const res = await testServer.get('/pessoas/1');
    expect(res.body).toBe('getById');
  });
  it('should occur and error because query limit and params are required', async () => {
    const res = await testServer.get('/pessoas');
    expect(res.body).toHaveProperty('errors.query');
  });
  it('should get people all people and return getAll text', async () => {
    const res = await testServer.get('/pessoas?limit=1&page=1');
    expect(res.body).toBe('getAll');
  });
});
