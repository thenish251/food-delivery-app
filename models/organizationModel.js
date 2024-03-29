const db = require('../config/db');

class Organization {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getById(id) {
    try {
      const query = 'SELECT * FROM organization WHERE id = $1';
      const { rows } = await db.query(query, [id]);
      if (rows.length === 0) return null;
      const { id: orgId, name } = rows[0];
      return new Organization(orgId, name);
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const query = 'SELECT * FROM organization';
      const { rows } = await db.query(query);
      return rows.map(row => new Organization(row.id, row.name));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Organization;
