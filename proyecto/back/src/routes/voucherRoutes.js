import { Router } from 'express';
import { createVoucher, redeemVoucher, listVouchers } from '../controllers/voucherController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticate, createVoucher);
router.post('/redeem', authenticate, redeemVoucher);
router.get('/', authenticate, listVouchers);

export default router;
