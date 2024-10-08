const { Router } = require('express')
const userRoutes = require('./user.routes')
const movieNotesRoutes = require('./movieNotes.routes')
const movieTagsRoutes = require('./movieTags.routes')
const sessionsRoutes = require('./sessions.routes')
const routes = Router()


routes.use('/user', userRoutes)
routes.use('/notes', movieNotesRoutes)
routes.use('/tags', movieTagsRoutes)
routes.use('/sessions', sessionsRoutes)


module.exports = routes