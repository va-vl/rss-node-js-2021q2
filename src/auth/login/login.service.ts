import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
//
import { User } from '../../entities/user';
import { config } from '../../common';
import * as utils from '../../utils';
import { EntityForbiddenError } from '../../errors';

const { JWT_SECRET_KEY } = config;

export const signToken = async (
  login: string,
  password: string
): Promise<string> => {
  const user = await getRepository(User).findOne({ login });

  if (user === undefined) {
    throw new EntityForbiddenError('Incorrect login / password!');
  }

  const isMatching = await utils.encryptor.checkPasswordHash(
    password,
    user.passwordHash
  );

  if (!isMatching) {
    throw new EntityForbiddenError('Invalid JWT!');
  }

  return jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY);
};
