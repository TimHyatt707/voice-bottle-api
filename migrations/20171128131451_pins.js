exports.up = knex =>
  knex.schema.createTable('pins', (t) => {
    t.increments('id');
    t
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    t.string('message_url').notNullable();
    t.string('coordinates').notNullable();
    t.string('name');
  });
exports.down = knex => knex.schema.dropTable('pins');
