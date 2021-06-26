import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import * as loginService from './loginService';
import { routeParamPreserver } from '../../middleware';
import { asyncErrorHandler, notAllowedHandler } from '../../utils';

const router = express.Router();

router
  .route('/')
  .post(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { login } = req.body;
      const token = await loginService.signToken(login);
      res.status(StatusCodes.OK).json(token);
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

export default router;
