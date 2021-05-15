const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.get(req.params.userId);

  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.save(req.body);

  res.status(200).json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(
    req.params.userId,
    req.body
  );
  
  res.status(200).json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  await usersService.remove(req.params.userId);

  res.sendStatus(200);
});


module.exports = router;
