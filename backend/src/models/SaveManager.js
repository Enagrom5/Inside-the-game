const AbstractManager = require("./AbstractManager");

class SaveManager extends AbstractManager {
  constructor() {
    super({ table: "save" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  // The C of CRUD - Create operation

  async create(saveNumber, saveUserId) {
    const [result] = await this.database.query(
      `insert into ${this.table} ( user_id, save )
             values (?, ?)`,
      [saveUserId, saveNumber]
    );

    return result.insertId;
  }

  async update(save) {
    const [result] = await this.database.query(
      `update ${this.table} 
      set save=?, user_id=?
      where user_id=?
             `,
      [save.save, save.userId, save.userId]
    );

    return result.insertId;
  }
}
module.exports = SaveManager;
