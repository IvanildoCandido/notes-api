const connection = require("../db");
module.exports = {
  getAll: async () => {
    const [notes] = await connection.execute("SELECT * FROM notes");
    return notes;
  },
  findById: async (id) => {
    const [note] = await connection.execute("SELECT * FROM notes WHERE id=?", [
      id,
    ]);
    return note[0];
  },
  add: async (title, body) => {
    //TODO Perguntar no plantão se tem como melhorar essa função
    await connection.execute("INSERT INTO notes (title, body) VALUES (?,?)", [
      title,
      body,
    ]);
    const [lastId] = await connection.execute("SELECT LAST_INSERT_ID() AS id");
    return lastId[0].id;
  },
  update: async (id, title, body) => {
    return await connection.execute(
      "UPDATE notes SET title=?, body=? WHERE id=?",
      [title, body, id],
    );
  },
  delete: async (id) => {
    return await connection.execute("DELETE FROM notes WHERE id=?", [id]);
  },
};
