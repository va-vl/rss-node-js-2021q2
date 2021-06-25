import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import * as tasksService from './task.service';
import { routeParamPreserver } from '../../middleware';
import { asyncErrorHandler, notAllowedHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router
  .route('/tasks')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId as string);
      res.status(StatusCodes.OK).json(tasks);
    })
  )
  .post(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { boardId } = req.params;
      const { body } = req;
      const task = await tasksService.create(boardId as string, body);
      res.status(StatusCodes.CREATED).json(task);
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

router
  .route('/tasks/:id')
  .get(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { boardId, id } = req.params;
      const task = await tasksService.getById(boardId as string, id as string);
      res.status(StatusCodes.OK).json(task);
    })
  )
  .put(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { boardId, id } = req.params;
      const { body } = req;
      const task = await tasksService.update(
        boardId as string,
        id as string,
        body
      );
      res.status(StatusCodes.OK).json(task);
    })
  )
  .delete(
    routeParamPreserver,
    asyncErrorHandler(async (req, res) => {
      const { boardId, id } = req.params;
      await tasksService.remove(boardId as string, id as string);
      res.status(StatusCodes.NO_CONTENT).send();
    })
  )
  .all(routeParamPreserver, notAllowedHandler);

export default router;
