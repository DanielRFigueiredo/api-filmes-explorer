const AppError = require('../utils/AppError')

class UserController {
  create(req, res) {
    const { password, name, email } = req.body
    if (!name) {
      throw new AppError('name is required')
    }
    res.status(201).json({ password, name, email })
  }
}


module.exports = UserController;