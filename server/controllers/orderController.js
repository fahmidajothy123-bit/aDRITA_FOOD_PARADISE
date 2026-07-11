import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// Return orders in the exact shape the React frontend already expects
const toClient = (o) => ({
  id: o.orderId,
  date: new Date(o.createdAt).toISOString().split('T')[0],
  items: o.items,
  total: o.total,
  status: o.status,
  trackingStep: o.trackingStep,
  paymentMethod: o.paymentMethod,
  deliveryInfo: o.deliveryInfo,
});

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    subtotal,
    deliveryFee = 0,
    vat = 0,
    discount = 0,
    total,
    deliveryInfo,
    paymentMethod = 'cod',
    promoCode = '',
  } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  // Build a human-readable order id like #ORD-2026-001
  const count = await Order.countDocuments();
  const year = new Date().getFullYear();
  const orderId = `#ORD-${year}-${String(count + 1).padStart(3, '0')}`;

  const order = await Order.create({
    orderId,
    user: req.user._id,
    items,
    subtotal,
    deliveryFee,
    vat,
    discount,
    total,
    deliveryInfo,
    paymentMethod,
    promoCode,
    status: 'Order Placed',
    trackingStep: 0,
  });

  res.status(201).json(toClient(order));
});

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders.map(toClient));
});

// @desc    Get a single order by its order id
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    orderId: req.params.id,
    user: req.user._id,
  });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(toClient(order));
});
