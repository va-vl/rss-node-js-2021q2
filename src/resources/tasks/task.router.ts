import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router({ mergeParams: true });

router.get('/:boardId/tasks', async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
  } catch (err) {
    next(err);
  }
});

router.get('/:boardId/tasks/:id', async (req, res, next) => {
  try {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);
    res.status(StatusCodes.OK).json(Task.toResponse(task));
  } catch (err) {
    next(err);
  }
});

router.post('/:boardId/tasks', async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { body } = req;
    const task = await tasksService.create(boardId, body);
    res.status(StatusCodes.CREATED).json(Task.toResponse(task));
  } catch (err) {
    next(err);
  }
});

router.put('/:boardId/tasks/:id', async (req, res, next) => {
  try {
    const { boardId, id } = req.params;
    const { body } = req;
    const updatedTask = await tasksService.update(boardId, id, body);
    res.status(StatusCodes.OK).json(Task.toResponse(updatedTask));
  } catch (err) {
    next(err);
  }
});

router.delete('/:boardId/tasks/:id', async (req, res, next) => {
  try {
    const { boardId, id } = req.params;
    await tasksService.remove(boardId, id);
    res.status(StatusCodes.NO_CONTENT).send('Task removed!');
  } catch (err) {
    next(err);
  }
});

export default router;
