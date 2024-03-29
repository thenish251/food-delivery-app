const request = require('supertest');

describe('POST /calculatePrice', () => {
  it('should calculate the price correctly', async () => {
    const requestBody = {
      zone: 'central',
      organization_id: '005',
      total_distance: 12,
      item_type: 'perishable'
    };

    const response = await request(app)
      .post('/calculatePrice')
      .send(requestBody)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('total_price');
    expect(response.body.total_price).toBeGreaterThan(0);
  });

  it('should return 400 if required parameters are missing', async () => {
    const requestBody = {
      // Missing required parameters
    };

    await request(app)
      .post('/calculatePrice')
      .send(requestBody)
      .expect('Content-Type', /json/)
      .expect(400);
  });

});
