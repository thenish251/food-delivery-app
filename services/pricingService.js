const pricingModel = require('../models/pricingModel');

exports.calculatePrice = async (zone, organizationId, totalDistance, itemType) => {
  try {
    // Fetch pricing data from the database based on zone, organization, and item type
    const pricingData = await pricingModel.getPricing(zone, organizationId, itemType);

    // Calculate total price based on pricing data and total distance
    const totalPrice = calculateTotalPrice(pricingData, totalDistance);

    return totalPrice;
  } catch (error) {
    throw error;
  }
};

function calculateTotalPrice(pricingData, totalDistance) {
  try {
    if (!pricingData) {
      throw new Error('Pricing data not found');
    }

    const { base_distance_in_km, km_price_cents, fix_price_cents } = pricingData;

    // Calculate total price based on pricing data and total distance
    const basePrice = totalDistance <= base_distance_in_km ? fix_price_cents : fix_price_cents + (totalDistance - base_distance_in_km) * km_price_cents;


    return basePrice;
  } catch (error) {
    throw error;
  }
}
