import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
//
import { User } from '../../entities/user';
import { config } from '../../common';
import { EntityForbiddenError } from '../../errors';

const { JWT_SECRET_KEY } = config;

export const signToken = async (login: string): Promise<string> => {
  const user = await getRepository(User).findOne({ login });

  if (user === undefined) {
    throw new EntityForbiddenError('Incorrect login / password!');
  }

  return jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY);
};
