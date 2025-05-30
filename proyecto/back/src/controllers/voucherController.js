import { createVoucher, redeemVoucher, listVouchers } from '../services/voucherService.js';

export const createVoucher = async (req, res) => {
  try {
    const { userId, value, expirationDate } = req.body;
    const voucher = await createVoucher(userId, value, expirationDate);
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const redeemVoucher = async (req, res) => {
  try {
    const { userId, voucherId } = req.body;
    const voucher = await redeemVoucher(userId, voucherId);
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listVouchers = async (req, res) => {
  try {
    const { userId } = req.params;
    const vouchers = await listVouchers(userId);
    res.json(vouchers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
