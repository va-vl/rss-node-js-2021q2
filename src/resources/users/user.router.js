const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
//
const User = require('./user.model');
const usersService = require('./user.service');
const asyncErrorHandler = require('../../utils/async-error-handler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();

    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.create({ name, login, password });

    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.update(id, { name, login, password });

    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    await usersService.remove(id);

    res.status(StatusCodes.NO_CONTENT).send('User removed');
  })
);

module.exports = router;
