const { Router } = require('express')
const UserController = require('../controllers/UserController')
const routes = Router()
const userController = new UserController()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


routes.post('/', userController.create)
routes.put('/', ensureAuthenticated, userController.update)

module.exports = routes