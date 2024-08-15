const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { hash } = require('bcryptjs')
class UserController {
  async create(req, res) {
    const { password, name, email } = req.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (checkUserExists) {
      throw new AppError('User already exists')
    }
    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    res.status(201).json({ password, name, email })
  }
}


module.exports = UserController;