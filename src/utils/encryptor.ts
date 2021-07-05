import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const checkPasswordHash = async (
  password: string,
  passwordHash: string
): Promise<boolean> => bcrypt.compare(password, passwordHash);
