import { registerAs } from '@nestjs/config';
//
import config from './config';

export default registerAs('jwt.config', () => {
  const { JWT_SECRET_KEY } = config();

  return {
    secret: JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '60m',
    },
  };
});
