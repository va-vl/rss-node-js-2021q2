const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
//
const boardsService = require('./board.service');
const asyncErrorHandler = require('../../utils/async-error-handler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardsService.getAll();

    res.status(StatusCodes.OK).json(boards);
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);

    res.status(StatusCodes.OK).json(board);
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const props = req.body;
    const board = await boardsService.create(props);

    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(id, props);

    res.status(StatusCodes.OK).json(board);
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    await boardsService.remove(req.params.id);

    res
      .status(StatusCodes.NO_CONTENT)
      .send(`Board ${id} successfully removed.`);
  })
);

module.exports = router;
