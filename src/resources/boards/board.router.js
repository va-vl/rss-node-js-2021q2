const router = require('express').Router();
// 
const Board = require('./board.model');
const boardsService = require('./board.service');
const catchRouteError = require("../../utils/catch-route-error");

router.route("/").get(
  catchRouteError(async (req, res) => {
    const boards = await boardsService.getAll();

    res
      .status(200)
      .json(boards.map(Board.toResponse));
  })
);

router.route("/:id").get(
  catchRouteError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);

    res
      .status(200)
      .json(Board.toResponse(board));
  })
);

router.route('/').post(
  catchRouteError(async (req, res) => {
    const board = await boardsService.create(Board.fromRequest(req.body));
  
    res
      .status(200)
      .json(board);
  })
);

router.route('/:boardId').put(
  catchRouteError(async (req, res) => {
    const updatedBoard = await boardsService.update(
      req.params.id, 
      Board.fromRequest(req.params.body)
    );

    res
      .status(200)
      .json(Board.toResponse(updatedBoard));
  })
);

router.route('/:boardId').delete(
  catchRouteError(async (req, res) => {
    await boardsService.remove(req.params.id);
    
    res
      .status(204)
      .send('Board removed!');
  })
);

module.exports = router;
