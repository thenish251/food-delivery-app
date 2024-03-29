const db = require('../config/db');

exports.getPricing = async (zone, organizationId, itemType) => {
  try {
    // Fetch pricing data from the database based on zone, organization, and item type
    const query = `
      SELECT base_distance_in_km, km_price_cents, fix_price_cents
      FROM pricing
      WHERE zone = $1 AND organization_id = $2 AND item_type = $3
    `;
    const { rows } = await db.query(query, [zone, organizationId, itemType]);
    return rows[0]; // Assuming there's only one pricing record per combination
  } catch (error) {
    throw error;
  }
};
