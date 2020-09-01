const ResourceService = {
  getAllResources(db) {
    return db.select('*').from('resource');
  },

  insertResource(db, newResource) {
    return db
      .insert(newResource)
      .into('resource')
      .return('*')
      .then(row => {
        return row[0];
      });
  },

  getById(db, id){
    return db.from('resource').select('*').where('id',id).first();
  },

  deleteResource(db,id){
    return db('resource')
      .where({id})
      .delete();
  },

  updateResource(db, id, newResource){
    return db('resource')
      .where({id})
      .update(newResource);
  },
};
  
module.exports = ResourceService;