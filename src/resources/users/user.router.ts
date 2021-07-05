import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import * as usersService from './user.service';
import { routeParamPreserver } from '../../middleware';
import { asyncErrorHandler, notAllowedHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (_req, res) => {
      const users = await usersService.getAll();
      res.status(StatusCodes.OK).json(users);
    })
  )
  .post(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const props = req.body;
      const user = await usersService.create(props);
      res.status(StatusCodes.CREATED).json(user);
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

router
  .route('/:id')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      const user = await usersService.getById(id as string);
      res.status(StatusCodes.OK).json(user);
    })
  )
  .put(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      const { name, login, password } = req.body;
      const user = await usersService.update(id as string, {
        name,
        login,
        password,
      });
      res.status(StatusCodes.OK).json(user);
    })
  )
  .delete(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      await usersService.remove(id as string);
      res.status(StatusCodes.NO_CONTENT).send();
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

export default router;
