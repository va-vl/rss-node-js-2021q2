const router = require('express').Router();
// 
const boardsService = require('./board.service');
const catchRouteError = require("../../utils/catch-route-error");

router.route("/").get(
  catchRouteError(async (req, res) => {
    const boards = await boardsService.getAll();

    res
      .status(200)
      .json(boards);
  })
);

router.route("/:id").get(
  catchRouteError(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);

    res
      .status(200)
      .json(board);
  })
);

router.route('/').post(
  catchRouteError(async (req, res) => {
    const props = req.body;
    const board = await boardsService.create(props);

    res
      .status(201)
      .json(board);
  })
);

router.route('/:id').put(
  catchRouteError(async (req, res) => {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(id, props);

    res
      .status(200)
      .json(board);
  })
);

router.route('/:id').delete(
  catchRouteError(async (req, res) => {
    await boardsService.remove(req.params.id);
    
    res
      .status(204)
      .send('Board removed!');
  })
);

module.exports = router;
