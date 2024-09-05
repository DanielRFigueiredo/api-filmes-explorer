const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')
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

    return res.status(201).json()
  }

  async update(req, res) {

    const { name, email, old_password, password } = req.body
    const { id: user_id } = req.user

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
    if (!user) {
      throw new AppError('User does not exist')
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already exists')
    }

    user.email = email ?? user.email
    user.name = name ?? user.name

    if (password && !old_password) {
      throw new AppError('Old password is required')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect')
      }
      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      where id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return res.json()

  }
}


module.exports = UserController;