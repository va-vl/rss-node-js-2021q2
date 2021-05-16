const router = require('express').Router();
//
const User = require('./user.model');
const usersService = require('./user.service');
const catchRouteError = require('../../utils/catch-route-error');

router.route('/').get(
  catchRouteError(async (req, res) => {
    const users = await usersService.getAll();

    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchRouteError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  catchRouteError(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.create({ name, login, password });

    res.status(201).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchRouteError(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.update(id, { name, login, password });

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchRouteError(async (req, res) => {
    const { id } = req.params;

    await usersService.remove(id);

    res.status(204).send('User removed');
  })
);

module.exports = router;
