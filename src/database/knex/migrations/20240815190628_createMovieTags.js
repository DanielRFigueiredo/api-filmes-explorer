
exports.up = knex => knex.schema.createTable('movie_tags', table => {
  table.increments('id');
  table.integer('note_id').references('id').inTable('movie_notes').onDelete('CASCADE');
  table.integer('user_id').references('id').inTable('users');
  table.enu('name', ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'sci-fi', 'thriller', 'war']).notNullable();


})


exports.down = knex => knex.schema.dropTable('movie_tags')
