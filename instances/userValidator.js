const Yup = require('yup');

const Validator = require('./../validators/Validator');

const schemas = {
  create: {
    email: Yup.string()
      .email()
      .trim()
      .required(),
    username: Yup.string()
      .trim()
      .required(),
    password: Yup.string().trim(),
  },
};

module.exports = new Validator({
  name: 'User',
  schemas,
});
