import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import boardsService from './board.service';
import { asyncErrorHandler } from '../../utils';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  asyncErrorHandler(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.status(StatusCodes.OK).json(boards);
  })
);

router.get(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id as string);
    res.status(StatusCodes.OK).json(board);
  })
);

router.post(
  '/',
  asyncErrorHandler(async (req, res) => {
    const props = req.body;
    const board = await boardsService.create(props);
    res.status(StatusCodes.CREATED).json(board);
  })
);

router.put(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const props = req.body;
    const board = await boardsService.update(id as string, props);
    res.status(StatusCodes.OK).json(board);
  })
);

router.delete(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    await boardsService.remove(id as string);
    res
      .status(StatusCodes.NO_CONTENT)
      .send(`Board ${id} successfully removed.`);
  })
);

export default router;
