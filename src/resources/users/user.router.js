const router = require('express').Router();
// 
const User = require('./user.model');
const usersService = require('./user.service');
const catchRouteError = require("../../utils/catch-route-error");

router.route('/').get(
  catchRouteError(async (req, res) => {
    const users = await usersService.getAll();
    
    res
      .status(200)
      .json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchRouteError(async (req, res) => {
    const user = await usersService.getById(req.params.id);

    res
      .status(200)
      .json(User.toResponse(user));
  })
);

router.route('/').post(
  catchRouteError(async (req, res) => {
    const user = await usersService.create(req.body);

    res
      .status(200)
      .json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchRouteError(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);

    res
      .status(200)
      .json(User.toResponse(user));
  })
);

router.route('/:userId').delete(
  catchRouteError(async (req, res) => {
    await usersService.remove(req.params.id);

    res
      .status(204)
      .send('User removed');
  })
);


module.exports = router;
