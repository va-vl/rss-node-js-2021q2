import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import boardsService from './board.service';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.status(StatusCodes.OK).json(boards);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    res.status(StatusCodes.OK).json(board);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const props = req.body;
    const board = await boardsService.create(props);
    res.status(StatusCodes.CREATED).json(board);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(id, props);
    res.status(StatusCodes.OK).json(board);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await boardsService.remove(id);
    res
      .status(StatusCodes.NO_CONTENT)
      .send(`Board ${id} successfully removed.`);
  } catch (err) {
    next(err);
  }
});

export default router;
