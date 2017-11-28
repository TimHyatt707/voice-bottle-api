const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const usersRouter = require('./routes/users');

const pinsRouter = require('./routes/pins');

const upvotesRouter = require('./routes/upvotes');

const authenticationRouter = require('./routes/authentication');

const PORT = parseInt(process.env.PORT, 10) || 8000;

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.use(authenticationRouter);
server.use(usersRouter);
server.use(pinsRouter);
server.use(upvotesRouter);

server.all('*', (res) => {
  res.sendStatus('405');
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`); // eslint-disable-line no-console
});

module.exports = server;
