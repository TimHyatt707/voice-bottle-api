const Yup = require('yup');

class Validator {
  constructor({ name, schemas }) {
    this.name = name;
    this.schemas = schemas;
  }
  async validate(input, schemaName) {
    try {
      const schema = this.schemas[schemaName];
      return await Yup.object(schema).validate(input);
    } catch (error) {
      return error;
    }
  }
}

module.exports = Validator;
