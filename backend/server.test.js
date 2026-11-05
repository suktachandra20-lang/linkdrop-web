const request = require('supertest');
const app = require('./server');
const Link = require('./Link');


jest.mock('./Link', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('LinkDrop API Integration Tests', () => {

  
  it('GET / - Should respond to base route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBeLessThan(500);
  });

  
  it('GET /api/click/:id - Should return 404 for invalid link ID', async () => {
    
    Link.findByIdAndUpdate.mockResolvedValueOnce(null);

    const res = await request(app).get('/api/click/60f7192b8d1b2c0015f3a000');
    expect(res.statusCode).toEqual(404);
  });

});