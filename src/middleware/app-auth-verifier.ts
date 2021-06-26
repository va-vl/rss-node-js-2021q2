import jwt, { JwtPayload } from 'jsonwebtoken';
//
import * as usersRepo from '../resources/users/user.repository';
import { asyncErrorHandler } from '../utils';
import { config } from '../common';
import { NotAuthorizedError, EntityForbiddenError } from '../errors';

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

    const { userId: id } = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    if (typeof id !== 'string') {
      throw new EntityForbiddenError('Invalid token!');
    }

    await usersRepo.getById(id);
    next();
  }
);

export default appAuthVerifier;
