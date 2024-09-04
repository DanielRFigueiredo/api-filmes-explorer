const { Router } = require('express')

const multer = require('multer')
const { MULTER } = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const UserController = require('../controllers/UserController')
const UserAvatarController = require('../controllers/UserAvatarController')
const userController = new UserController()
const userAvatarController = new UserAvatarController()
const routes = Router()
const upload = multer(MULTER)



routes.post('/', userController.create)
routes.put('/', ensureAuthenticated, userController.update)

routes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = routes