import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getById(id);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.create({ name, login, password });
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.update(id, { name, login, password });
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }  
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await usersService.remove(id);
    res.status(StatusCodes.NO_CONTENT).send('User removed');
  } catch (err) {
    next(err);
  }
});

export default router;
