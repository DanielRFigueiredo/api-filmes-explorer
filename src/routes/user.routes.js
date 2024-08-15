const { Router } = require('express')
const UserController = require('../controllers/UserController')
const routes = Router()
const userController = new UserController()


routes.post('/', userController.create)

module.exports = routes