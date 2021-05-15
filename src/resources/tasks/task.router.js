const router = require('express').Router();
// 
const Task = require('./task.model');
const tasksService = require('./task.service');
const catchRouteError = require("../../utils/catch-route-error");

router.route('/:boardId/tasks').get(
  catchRouteError(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    
    res
      .status(200)
      .json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:id').get(
  catchRouteError(async (req, res) => {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    
    res
      .status(200)
      .json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks').post(
  catchRouteError(async (req, res) => {
    const task = await tasksService.create(req.params.boardId, req.body);

    res
      .status(201)
      .json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:id').put(
  catchRouteError(async (req, res) => {
    const updatedTask = await tasksService.update(
      req.params.boardId, req.params.id, req.body
    );

    res
      .status(200)
      .json(Task.toResponse(updatedTask));
  })
);

router.route('/:boardId/tasks/:id').delete(
  catchRouteError(async (req, res) => {
    await tasksService.remove(req.params.boardId, req.params.id);

    res
      .status(204)
      .send('Task removed!');
  })
);

module.exports = router;
