class UserRepository {
  constructor({ db }) {
    this.db = db;
  }
  async getByUserId(id) {
    try {
      const record = await this.db('users')
        .where('id', id)
        .returning('*');
      if (!record.length) throw new Error('User not found');
      return [record];
    } catch (error) {
      if (error.message === 'User not found') throw new Error('User not found');
      else throw new Error('Something went wrong');
    }
  }
  async create(credentials) {
    try {
      const record = await this.db('users')
        .insert(credentials)
        .returning('*');
      if (!record.length) throw new Error('Username/email already exists');
      return [record];
    } catch (error) {
      if (error.message === 'Username/email already exists') {
        throw new Error('Username/email already exists');
      } else throw new Error('Something went wrong');
    }
  }
  async update(id, changes) {
    try {
      const record = await this.db('users')
        .update(changes)
        .where('id', id)
        .returning('*');
      if (!record.length) throw new Error('User not found');
      return [record];
    } catch (error) {
      if (error.message === 'User not found') throw new Error('User not found');
      else throw new Error('Something went wrong');
    }
  }
}

module.exports = UserRepository;
