import jwt, { JwtPayload } from 'jsonwebtoken';
//
import * as usersRepo from '../resources/users/user.repository';
import { asyncErrorHandler } from '../utils';
import { config } from '../common';
import { NotAuthorizedError } from '../errors';

const { JWT_SECRET_KEY } = config;

const appAuthVerifier = asyncErrorHandler(
  async (req, _res, next): Promise<void> => {
    const authHeader = req.header('Authorization');

    if (authHeader === undefined) {
      throw new NotAuthorizedError();
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || token === undefined) {
      throw new NotAuthorizedError('Invalid auth scheme!');
    }

    let id;

    try {
      const { userId } = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
      id = userId;
    } catch {
      throw new NotAuthorizedError('Invalid signature!');
    }

    if (typeof id !== 'string') {
      throw new NotAuthorizedError('Invalid signature!');
    }

    try {
      await usersRepo.getById(id);
    } catch {
      throw new NotAuthorizedError('Invalid token!');
    }

    next();
  }
);

export default appAuthVerifier;
