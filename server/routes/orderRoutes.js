import express from 'express';
import { createOrder, getMyOrders, getOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, getMyOrders);
router.get('/:id', protect, getOrder);

export default router;
