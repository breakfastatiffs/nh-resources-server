const path = require('path');
const express = require('express');
const xss = require('xss');
const ResourceService = require('./resource-service');

const resourceRouter = express.Router();
const jsonParser = express.json();

const serializeResource = resource => ({
  resource_id: resource.id,
  category: resource.resource_category,
  title: xss(resource.title),
  phone: xss(resource.phone_number),
  street: xss(resource.street_address),
  city: xss(resource.city),
  state: xss(resource.state),
  zipcode: xss(resource.zip_code),
  county: xss(resource.county),
  url: xss(resource.url),
  facebook: xss(resource.facebook),
  twitter: xss(resource.twitter),
  instagram: xss(resource.instagram),
  user_id: resource.user_id,
  date_created: resource.date_created
});

resourceRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ResourceService.getAllResources(knexInstance)
      .then(resource => {
        res.json(resource.map(serializeResource));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    //   Do I need to include everything in this, or JUST required inputs? t h i n k
    // include all, but create validator to include empty social media ('non-required fields')
    const { resource_id, user_id, category, title, phone, street, city, state, zip_code, county, url, facebook, twitter, instagram, date_created } = req.body;
    const newResource = { resource_id, user_id, category, title, phone, street, city, state, zip_code, county, url, facebook, twitter, instagram };

    for (const [key, value] of Object.entries(newResource))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    // create more validators: checking url, case sensitive, proper # length, 1/10 counties,

    newResource.date_created = date_created;

    ResourceService.insertResource(
      req.app.get('db'),
      newResource
    )
      .then(resource => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${resource.id}`))
          .json(serializeResource(resource));
      })
      .catch(next);
  });

resourceRouter
  .route('/:resource_id')
  .all((req, res, next) => {
    ResourceService.getById(
      req.app.get('db'),
      req.params.resource_id
    )
      .then(resource => {
        if (!resource) {
          return res.status(404).json({
            error: { message: 'Sorry dog, that resource doesn\'t exist. Try another resource' }
          });
        }
        res.resource = resource;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeResource(res.resource));
  })
  .delete((req, res, next) => {
    ResourceService.deleteResource(
      req.app.get('db'),
      req.params.resource_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  // create validator to include resources without user_id
  .patch(jsonParser, (req, res, next) => {
    const { resource_id, user_id, category, title, phone, street, city, state, zip_code, county, url, facebook, twitter, instagram } = req.body;
    const resourceToUpdate = { resource_id, user_id, category, title, phone, street, city, state, zip_code, county, url, facebook, twitter, instagram};

    for (const [key, value] of Object.entries(resourceToUpdate))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    ResourceService.updateResource(
      req.app.get('db'),
      req.params.resource_id,
      resourceToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = resourceRouter;