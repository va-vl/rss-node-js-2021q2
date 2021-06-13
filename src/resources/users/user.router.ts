import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import User from './user.model';
import usersService from './user.service';
import { asyncErrorHandler } from '../../utils';
import { routeParamPreserver } from '../../middleware';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  routeParamPreserver,
  asyncErrorHandler(async (_req, res) => {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  })
);

router.get(
  '/:id',
  routeParamPreserver,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id as string);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  })
);

router.post(
  '/',
  routeParamPreserver,
  asyncErrorHandler(async (req, res) => {
    const props = req.body;
    const user = await usersService.create(props);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.put(
  '/:id',
  routeParamPreserver,
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
  routeParamPreserver,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id as string);
    res.status(StatusCodes.NO_CONTENT).send();
  })
);

export default router;
