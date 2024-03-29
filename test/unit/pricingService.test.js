const pricingService = require('../../services/pricingService');
const pricingModel = require('../../models/pricingModel');

jest.mock('../../models/pricing');

describe('Pricing Service', () => {
  describe('calculatePrice', () => {
    it('should calculate the total price correctly', async () => {
      // Mock pricing data
      const pricingData = {
        base_distance_in_km: 5,
        km_price_cents: 150, // 1.5 EUR/km
        fix_price_cents: 1000, // 10 EUR
      };
      pricingModel.getPricing.mockResolvedValue(pricingData);

      // Call calculatePrice function
      const totalPrice = await pricingService.calculatePrice('central', '005', 12, 'perishable');

      // Calculate expected total price
      // Assuming total distance is beyond base distance
      const expectedPrice = 1000 + (12 - 5) * 150;

      // Assert
      expect(totalPrice).toEqual(expectedPrice);
    });

    it('should throw an error if pricing data is not found', async () => {
      // Mock getPricing function to return null (pricing data not found)
      pricingModel.getPricing.mockResolvedValue(null);

      // Call calculatePrice function
      await expect(pricingService.calculatePrice('central', '005', 12, 'perishable')).rejects.toThrow('Pricing data not found');
    });

  });
});
