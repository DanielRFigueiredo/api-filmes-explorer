const knex = require('../database/knex')

class MovieTagsController {
  async index(req, res) {
    const { id: user_id } = req.user
    const tags = await knex('movie_tags').where({ user_id })
    return res.json(tags)

  }

}
module.exports = MovieTagsController