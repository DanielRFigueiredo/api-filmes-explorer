const sqliteConnection = require('../../sqlite')
const createUser = require('./createUser')

async function migrationsRun() {
  const schema = [
    createUser
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schema))
    .catch(err => console.log(err))
}

module.exports = migrationsRun;