class UpvoteRepository {
  constructor({ db }) {
    this.db = db;
  }
  async getByPinId(id) {
    try {
      const record = await this.db('upvotes')
        .where('pin_id', id)
        .returning('*');
      if (!record.length) throw new Error('Upvote not found');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async create(userId, data) {
    try {
      const upvote = Object.assign({}, { user_id: userId }, { pin_id: data });
      const record = await this.db('upvotes')
        .insert(upvote)
        .returning('*');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async delete(id) {
    try {
      const record = await this.db('upvotes')
        .del()
        .where('id', id)
        .returning('*');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UpvoteRepository;
