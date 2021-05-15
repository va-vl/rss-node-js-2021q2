const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route("/").get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.route("/:boardId").get(async (req, res) => {
  const board = await boardsService.get(req.params.boardId);

  res.json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.save(Board.fromRequest(req.body));

  res.json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.update(
    req.params.boardId,
    req.body,
  );

  res.status(200).json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  await boardsService.remove(req.params.boardId);

  res.sendStatus(200);
});

module.exports = router;
