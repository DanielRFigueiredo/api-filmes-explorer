const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UserController {
  async create(req, res) {
    const { password, name, email } = req.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (checkUserExists) {
      throw new AppError('User already exists')
    }
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])

    res.status(201).json({ password, name, email })
  }
}


module.exports = UserController;