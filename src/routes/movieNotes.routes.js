const { Router } = require('express')
const MovieNotesController = require('../controllers/MovieNotesController')
const movieNotesController = new MovieNotesController()
const movieNotesRouter = Router()

movieNotesRouter.post('/:user_id', movieNotesController.create)
movieNotesRouter.get('/:id', movieNotesController.show)
movieNotesRouter.delete('/:id', movieNotesController.delete)
movieNotesRouter.get('/', movieNotesController.index)

module.exports = movieNotesRouter