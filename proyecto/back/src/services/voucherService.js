import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createVoucher = async (userId, value, expirationDate) => {
  const voucher = await prisma.voucher.create({
    data: {
      userId,
      value,
      expirationDate,
      redeemed: false,
    },
  });
  return voucher;
};

export const redeemVoucher = async (userId, voucherId) => {
  const voucher = await prisma.voucher.findFirst({
    where: {
      id: voucherId,
      userId,
      redeemed: false,
    },
  });
  if (!voucher) {
    throw new Error('Voucher not found or already redeemed');
  }
  await prisma.voucher.update({
    where: {
      id: voucher.id,
    },
    data: {
      redeemed: true,
    },
  });
  return voucher;
};

export const listVouchers = async (userId) => {
  const vouchers = await prisma.voucher.findMany({
    where: {
      userId,
    },
  });
  return vouchers;
};
