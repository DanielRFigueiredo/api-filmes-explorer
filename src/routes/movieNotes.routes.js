const { Router } = require('express')
const MovieNotesController = require('../controllers/MovieNotesController')
const movieNotesController = new MovieNotesController()
const movieNotesRouter = Router()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

movieNotesRouter.use('/', ensureAuthenticated)
movieNotesRouter.post('/', movieNotesController.create)
movieNotesRouter.get('/:id', movieNotesController.show)
movieNotesRouter.get('/', movieNotesController.index)
movieNotesRouter.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRouter