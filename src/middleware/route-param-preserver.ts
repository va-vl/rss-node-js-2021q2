import express from 'express';

const routeParamPreserver: express.RequestHandler = (req, res, next) => {
  res.locals['params'] = req.params;
  next();
};

export default routeParamPreserver;
