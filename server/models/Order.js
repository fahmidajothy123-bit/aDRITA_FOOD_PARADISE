import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true }, // human readable: #ORD-2026-001
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    vat: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    deliveryInfo: {
      name: String,
      phone: String,
      address: String,
      instructions: String,
    },
    paymentMethod: { type: String, default: 'cod' },
    promoCode: { type: String, default: '' },
    status: { type: String, default: 'Order Placed' },
    trackingStep: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
