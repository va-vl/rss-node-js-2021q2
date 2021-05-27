const router = require('express').Router({ mergeParams: true });
const { StatusCodes } = require('http-status-codes');
//
const Task = require('./task.model');
const tasksService = require('./task.service');
const asyncErrorHandler = require('../../utils/async-error-handler');

router.route('/tasks').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/tasks/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);

    res.status(StatusCodes.OK).json(Task.toResponse(task));
  })
);

router.route('/tasks').post(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const { body } = req;
    const task = await tasksService.create(boardId, body);

    res.status(StatusCodes.CREATED).json(Task.toResponse(task));
  })
);

router.route('/tasks/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const { body } = req;
    const updatedTask = await tasksService.update(boardId, id, body);

    res.status(StatusCodes.OK).json(Task.toResponse(updatedTask));
  })
);

router.route('/tasks/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;

    await tasksService.remove(boardId, id);

    res.status(StatusCodes.NO_CONTENT).send('Task removed!');
  })
);

module.exports = router;
