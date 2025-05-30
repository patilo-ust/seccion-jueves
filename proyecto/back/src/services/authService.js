import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (name, email, password) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
};

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
