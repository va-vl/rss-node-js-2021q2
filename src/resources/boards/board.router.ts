import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import * as boardsService from './board.service';
import { routeParamPreserver } from '../../middleware';
import { asyncErrorHandler, notAllowedHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (_req, res) => {
      const boards = await boardsService.getAll();
      res.status(StatusCodes.OK).json(boards);
    })
  )
  .post(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const props = req.body;
      const board = await boardsService.create(props);
      res.status(StatusCodes.CREATED).json(board);
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

router
  .route('/:id')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.getById(id as string);
      res.status(StatusCodes.OK).json(board);
    })
  )
  .put(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      const props = req.body;
      const board = await boardsService.update(id as string, props);
      res.status(StatusCodes.OK).json(board);
    })
  )
  .delete(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { id } = req.params;
      await boardsService.remove(id as string);
      res.status(StatusCodes.NO_CONTENT).send();
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

export default router;
