const knex = require('../database/knex')


class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params



    const [note_id] = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id

    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        user_id,
        name
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    res.json()

  }

  async show(req, res) {
    const { id } = req.params
    const note = await knex('movie_notes').where({ id }).first()
    const tags = await knex('movie_tags').where({ note_id: id }).orderBy('name')

    res.json({
      ...note,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params
    await knex('movie_notes').where({ id }).delete()
    res.json()

  }
}


module.exports = MovieNotesController;

