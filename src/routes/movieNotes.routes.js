const { Router } = require('express')
const MovieNotesController = require('../controllers/MovieNotesController')
const movieNotesController = new MovieNotesController()
const movieNotesRouter = Router()

movieNotesRouter.post('/:user_id', movieNotesController.create)


module.exports = movieNotesRouter