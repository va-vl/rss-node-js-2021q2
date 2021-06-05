import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import User from './user.model';
import usersService from './user.service';
import { asyncErrorHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  asyncErrorHandler(async (_req, res) => {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  })
);

router.get(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id as string);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.post(
  '/',
  asyncErrorHandler(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.create({ name, login, password });
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.put(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.update(id as string, {
      name,
      login,
      password,
    });
    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.delete(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id as string);
    res.status(StatusCodes.NO_CONTENT).send('User removed');
  })
);

export default router;
