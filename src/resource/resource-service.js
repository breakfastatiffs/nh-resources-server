const ResourceService = {
  getAllResources(db) {
    return db.select('*').from('resource');
  },
  insertResource(db, newResource) {
    return db
      .insert(newResource)
      .into('resource')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db.from('resource').select('*').where('id', id).first();
  },
  deleteResource(db, id) {
    return db('resource').where({ id }).delete();
  },
  updateResource(db, id, newResourceData) {
    return db('resource').where({ id }).update(newResourceData);
  },
};

module.exports = ResourceService;