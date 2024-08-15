class UserController {
  create(req, res) {
    const { password, name, email } = req.body
    res.status(201).json({password, name, email})
  }
}


module.exports = UserController;