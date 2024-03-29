const db = require('../config/db');

class Item {
  constructor(id, type, description) {
    this.id = id;
    this.type = type;
    this.description = description;
  }

  static async getById(id) {
    try {
      const query = 'SELECT * FROM item WHERE id = $1';
      const { rows } = await db.query(query, [id]);
      if (rows.length === 0) return null;
      const { id: itemId, type, description } = rows[0];
      return new Item(itemId, type, description);
    } catch (error) {
      throw error;
    }
  }

  static async getByType(type) {
    try {
      const query = 'SELECT * FROM item WHERE type = $1';
      const { rows } = await db.query(query, [type]);
      return rows.map(row => new Item(row.id, row.type, row.description));
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const query = 'SELECT * FROM item';
      const { rows } = await db.query(query);
      return rows.map(row => new Item(row.id, row.type, row.description));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Item;
