exports.up = knex =>
  knex.schema.createTable('upvotes', (t) => {
    t.increments('id');
    t
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    t
      .integer('pin_id')
      .references('id')
      .inTable('pins')
      .notNullable()
      .onDelete('CASCADE');
  });
exports.down = knex => knex.schema.dropTable('upvotes');
