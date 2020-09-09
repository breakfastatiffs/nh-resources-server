
const ResourcesService = {
  getAllResources(db) {
    return db.select('*').from('resources');
  },

  createResource(db, resources) {
    return db
      .insert({
        title: resources.title,
        category: resources.category,
        phone_number: resources.phone_number,
        street: resources.street,
        city: resources.city,
        county: resources.county,
        state: resources.state,
        zip_code: resources.zip_code,
        url: resources.url,
        facebook: resources.facebook,
        twitter: resources.twitter,
        instagram: resources.instagram
      })
      .into('resources')
      .returning('*')
      .then(row => {
        return row[0];
      });
  },

  getById(db, id){
    return db.from('resources').select('*').where('id',id).first();
  },

  deleteById(db,id){
    return db('resources')
      .where({id})
      .delete();
  },

  updateById(db, id, newResource){
    return db('resources')
      .where({id})
      .update(newResource);
  },
};
  
module.exports = ResourcesService;