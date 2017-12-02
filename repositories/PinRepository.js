class PinRepository {
  constructor({ db }) {
    this.db = db;
  }
  async getByUser(id) {
    try {
      const records = await this.db('pins')
        .where('user_id', id)
        .returning('*');
      console.log(id, records);
      if (!records.length) throw new Error('Pin not found');
      return records;
    } catch (error) {
      if (error.message === 'Pin not found') throw new Error('Pin not found');
      throw new Error('Something went wrong');
    }
  }
  async getByLocation(coordinates) {
    try {
      coordinates = coordinates.split(',');
      const pins = [];
      const lat = parseFloat(coordinates[0]);
      const long = parseFloat(coordinates[1]);
      const poslat = lat + 0.016;
      const neglat = lat - 0.016;
      const poslong = long + 0.02;
      const neglong = long - 0.02;
      const records = await this.db('pins').returning('*');
      for (let i = 0; i < records.length; i++) {
        let coords = records[i].coordinates;
        coords = coords.split(',');
        const pinlat = parseFloat(coords[0]);
        const pinlong = parseFloat(coords[1]);
        if (pinlat <= poslat && pinlat >= neglat && pinlong <= poslong && pinlong >= neglong) {
          pins.push(records[i]);
        }
      }
      return pins;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  async getById(id) {
    try {
      const record = await this.db('pins')
        .where('id', id)
        .returning('*');
      if (!record.length) throw new Error('Pin not found');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async create(data) {
    try {
      const record = await this.db('pins')
        .insert(data)
        .returning('*');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async update(id, changes) {
    try {
      const record = await this.db('pins')
        .update(changes)
        .where('id', id)
        .returning('*');
      if (!record.length) throw new Error('Pin not found');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async delete(id) {
    try {
      const record = await this.db('pins')
        .del()
        .where('id', id)
        .returning('*');
      if (!record.length) throw new Error('Pin not found');
      return record[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = PinRepository;
