import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
}
