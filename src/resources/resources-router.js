const path = require('path');
const express = require('express');
const xss = require('xss');
const ResourcesService = require('./resources-service');

const resourcesRouter = express.Router();
const jsonParser = express.json();

const serializeResources = resources => ({
  resource_id: resources.id,
  category: resources.category,
  title: xss(resources.title),
  phone_number: xss(resources.phone_number),
  street: xss(resources.street),
  city: xss(resources.city),
  state: xss(resources.state),
  zip_code: xss(resources.zip_code),
  county: xss(resources.county),
  url: xss(resources.url),
  facebook: xss(resources.facebook),
  twitter: xss(resources.twitter),
  instagram: xss(resources.instagram),
  user_id: resources.user_id,
  date_created: resources.date_created
});

resourcesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ResourcesService.getAllResources(knexInstance)
      .then(resources => {
        res.json(resources.map(serializeResources));
      })
      .catch(next);
  });
resourcesRouter
  .route('/add-resource')
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const {
      resource_id,
      category,
      title,
      phone_number,
      street,
      city,
      state,
      zip_code,
      county,
      url,
      facebook,
      twitter,
      instagram,
      date_created
    } = req.body;

    const newResource = {
      id: resource_id,
      category,
      title,
      phone_number,
      street,
      city,
      state,
      zip_code,
      county,
      url,
      facebook,
      twitter,
      instagram,
      date_created
    };

    for (const [key, value] of Object.entries(newResource))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    // create more validators: checking url, case sensitive, proper # length, 1/10 counties,

    newResource.resource_id = resource_id;
    newResource.date_created = date_created;

    ResourcesService.createResource(
      knexInstance,
      newResource
    )
      .then(resources => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${resources.id}`))
          .json(serializeResources(resources));
      })
      .catch(next);
  });

resourcesRouter
  .route('/:resource_id')
  .all((req, res, next) => {
    ResourcesService.getById(
      req.app.get('db'),
      req.params.resource_id
    )
      .then(resources => {
        if (!resources) {
          return res.status(404).json({
            error: { message: 'Sorry dog, that resource doesn\'t exist. Try another resource' }
          });
        }
        res.resources = resources;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeResources(res.resources));
  })
  .delete((req, res, next) => {
    ResourcesService.deleteById(
      req.app.get('db'),
      req.params.resource_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });
// create validator to include resources without user_id
resourcesRouter
  .route('/resources/edit/:resource_id')
  .patch(jsonParser, (req, res, next) => {
    const {
      resource_id,
      category,
      title,
      phone_number,
      street,
      city,
      state,
      zip_code,
      county,
      url,
      facebook,
      twitter,
      instagram,
      date_created
    } = req.body;

    const resourcesToUpdate = {
      id: resource_id,
      category,
      title,
      phone_number,
      street,
      city,
      state,
      zip_code,
      county,
      url,
      facebook,
      twitter,
      instagram,
      date_created
    };

    for (const [key, value] of Object.entries(resourcesToUpdate))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    ResourcesService.updateById(
      req.app.get('db'),
      req.params.resource_id,
      resourcesToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = resourcesRouter;