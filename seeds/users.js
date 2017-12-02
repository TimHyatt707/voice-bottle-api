exports.seed = knex =>
  // Deletes ALL existing entries
  knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          id: 1,
          username: 'username1',
          email: 'coolemail',
          hashed_password: 'baloney',
        },
      ]))
    .then(knex('pins')
      .del()
      .then(() =>
        // Inserts seed entries
        knex('pins').insert([
          {
            id: 1,
            user_id: 1,
            message_url: 'something',
            coordinates: '37.8059887,-122.40991539999997',
            name: 'stockton',
          },
        ])));
