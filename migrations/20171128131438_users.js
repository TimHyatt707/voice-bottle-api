exports.up = knex =>
  knex.schema.createTable('users', (t) => {
    t.increments('id');
    t.string('username').notNullable();
    t.string('email').notNullable();
    t.string('hashed_password', 60).notNullable();
    t.string('avatar_url');
  });

exports.down = knex => knex.schema.dropTable('users');
