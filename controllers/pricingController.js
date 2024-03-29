const pricingService = require('../services/pricingService');

exports.calculatePrice = async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;

    // Input validation
    if (!zone || !organization_id || !total_distance || !item_type) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Calculate price using pricing service
    const totalPrice = await pricingService.calculatePrice(zone, organization_id, total_distance, item_type);

    // Respond with total price
    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
