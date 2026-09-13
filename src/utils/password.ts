import bcrypt from "bcryptjs";

export const hashedPassword = async (password: any) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};
export const verifyPassword = async (
  userPassword: string,
  hashedPassword: string,
) => {
  const isMatched = await bcrypt.compare(userPassword, hashedPassword);

  return isMatched;
};
