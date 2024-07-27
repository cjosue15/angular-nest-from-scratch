import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
