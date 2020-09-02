const path = require('path');
const express = require('express');
const xss = require('xss');
const usersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = users => ({
  user_name: xss(users.user_name),
  full_name: xss(users.full_name),
  password: xss(users.password),
  nickname: xss(users.nickname),
  user_id: users.user_id,
  date_created: users.date_created
});

usersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    usersService.getAllUsers(knexInstance)
      .then(resource => {
        res.json(resource.map(serializeUser));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { user_name, full_name, password, nickname, date_created } = req.body;
    const newUser = { user_name, full_name, password, nickname };

    for (const [key, value] of Object.entries(newUser))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    // create more validators: checking url, case sensitive, proper # length, 1/10 counties,

    newUser.date_created = date_created;

    usersService.insertUser(
      req.app.get('db'),
      newUser
    )
      .then(user => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${user.id}`))
          .json(serializeUser(user));
      })
      .catch(next);
  });

usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    usersService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: 'Sorry dog, that user doesn\'t exist. Double check your username and password.' }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeUser(res.user));
  })
  .delete((req, res, next) => {
    usersService.deleteUser(
      req.app.get('db'),
      req.params.user_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  // create validator to include resources without user_id
  .patch(jsonParser, (req, res, next) => {
    const { user_name, full_name, password, nickname } = req.body;
    const userToUpdate = { user_name, full_name, password, nickname };

    for (const [key, value] of Object.entries(userToUpdate))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    usersService.updateUser(
      req.app.get('db'),
      req.params.resource_id,
      userToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = usersRouter;