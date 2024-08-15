const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path');


async function sqliteConnect() {
  const db = await sqlite.open({
    filename: path.join(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })
  return db;
}

module.exports = sqliteConnect;