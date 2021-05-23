const router = require('express').Router();
//
const boardsService = require('./board.service');
const asyncErrorHandler = require('../../utils/async-error-handler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardsService.getAll();

    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);

    res.status(200).json(board);
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const props = req.body;
    const board = await boardsService.create(props);

    res.status(201).json(board);
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(id, props);

    res.status(200).json(board);
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    await boardsService.remove(req.params.id);

    res.status(204).send(`Board ${id} successfully removed.`);
  })
);

module.exports = router;
