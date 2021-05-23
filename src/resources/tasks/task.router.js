const router = require('express').Router({ mergeParams: true });
//
const Task = require('./task.model');
const tasksService = require('./task.service');
const appErrorHandler = require('../../utils/router-error-handler');

router.route('/tasks').get(
  appErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/tasks/:id').get(
  appErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);

    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/tasks').post(
  appErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const { body } = req;
    const task = await tasksService.create(boardId, body);

    res.status(201).json(Task.toResponse(task));
  })
);

router.route('/tasks/:id').put(
  appErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const { body } = req;
    const updatedTask = await tasksService.update(boardId, id, body);

    res.status(200).json(Task.toResponse(updatedTask));
  })
);

router.route('/tasks/:id').delete(
  appErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;

    await tasksService.remove(boardId, id);

    res.status(204).send('Task removed!');
  })
);

module.exports = router;
