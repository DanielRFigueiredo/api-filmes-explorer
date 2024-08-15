const { Router } = require('express')
const MovieTagsController = require('../controllers/MovieTagsController')
const movieTagsController = new MovieTagsController()
const movieTagsRouter = Router()

movieTagsRouter.get('/:user_id', movieTagsController.index)

module.exports = movieTagsRouter