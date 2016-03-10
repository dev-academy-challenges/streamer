exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function (table) {
      table.increments('id').primary()
      table.json('moves')
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games')
  ])
}
