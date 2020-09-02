const ResourcesService = {
  getAllResources(db) {
    return db.select('*').from('resources');
  },

  insertResources(db, newResources) {
    return db
      .insert(newResources)
      .into('resources')
      .return('*')
      .then(row => {
        return row[0];
      });
  },

  getById(db, id){
    return db.from('resources').select('*').where('id',id).first();
  },

  deleteResources(db,id){
    return db('resources')
      .where({id})
      .delete();
  },

  updateResources(db, id, newResources){
    return db('resources')
      .where({id})
      .update(newResources);
  },
};
  
module.exports = ResourcesService;