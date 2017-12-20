class PinRepository {
  constructor({ db }) {
    this.db = db;
  }
  async getByUser(id) {
    try {
      const records = await this.db('pins')
        .where('user_id', id)
        .returning('*');
      if (!records.length) throw new Error('Pin not found');
      return records;
    } catch (error) {
      if (error.message === 'Pin not found') throw new Error('Pin not found');
      throw new Error('Something went wrong');
    }
  }
  async getByLocation(coords) {
    try {
      const coordinates = coords.coordinates.split(',');
      const pins = [];
      const lat = parseFloat(coordinates[0]);
      const long = parseFloat(coordinates[1]);
      const poslat = lat + 0.04;
      const neglat = lat - 0.04;
      const poslong = long + 0.01;
      const neglong = long - 0.01;
      const records = await this.db('pins').returning('*');
      for (let i = 0; i < records.length; i++) {
        let latLng = records[i].coordinates;
        latLng = latLng.split(',');
        const pinlat = parseFloat(latLng[0]);
        const pinlong = parseFloat(latLng[1]);
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
      console.log(record);
      return record[0];
    } catch (error) {
      console.log(error.message, 'in repo layer');
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
