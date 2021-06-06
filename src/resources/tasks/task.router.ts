import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import Task from './task.model';
import tasksService from './task.service';
import { asyncErrorHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router.get(
  '/tasks',
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId as string);
    res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
  })
);

router.get(
  '/tasks/:id',
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId as string, id as string);
    res.status(StatusCodes.OK).json(Task.toResponse(task));
  })
);

router.post(
  '/tasks',
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const { body } = req;
    const task = await tasksService.create(boardId as string, body);
    res.status(StatusCodes.CREATED).json(Task.toResponse(task));
  })
);

router.put(
  '/tasks/:id',
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const { body } = req;
    const task = await tasksService.update(
      boardId as string,
      id as string,
      body
    );
    res.status(StatusCodes.OK).json(Task.toResponse(task));
  })
);

router.delete(
  '/tasks/:id',
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    await tasksService.remove(boardId as string, id as string);
    res.status(StatusCodes.NO_CONTENT).send();
  })
);

export default router;
