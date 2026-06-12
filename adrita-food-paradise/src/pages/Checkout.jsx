import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Tag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PROMO_CODES = { 'FIRST50': 0.5, 'SAVE20': 0.2, 'ADRITA10': 0.1 };

export default function Checkout() {
  const { cart, cartTotal, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '', phone: '', address: '', instructions: '',
  });
  const [payment, setPayment] = useState('cod');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');

  const delivery = cartTotal >= 800 ? 0 : 60;
  const vat = Math.round(cartTotal * 0.05);
  const discount = promoApplied ? Math.round(cartTotal * PROMO_CODES[promoApplied]) : 0;
  const total = cartTotal + delivery + vat - discount;

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    const orderId = placeOrder({ total });
    navigate('/track-order', { state: { orderId } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center page-enter">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 page-enter">
      <div className="bg-white border-b border-sky-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-0">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Delivery + Payment */}
            <div className="lg:col-span-2 space-y-5">
              {/* Delivery Info */}
              <div className="bg-white rounded-2xl border border-sky-100 p-6">
                <h2 className="font-bold text-gray-800 mb-5">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Adrita" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+8801855608532" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Delivery Address <span className="text-red-400">*</span></label>
                    <textarea name="address" value={form.address} onChange={handleChange}
                      placeholder="House, Road, Area, City..." required rows={2} className="input-field resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Special Instructions (Optional)</label>
                    <input name="instructions" value={form.instructions} onChange={handleChange}
                      placeholder="e.g., Ring the doorbell twice" className="input-field" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-sky-100 p-6">
                <h2 className="font-bold text-gray-800 mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order', emoji: '💵' },
                    { value: 'bkash', label: 'bKash', desc: 'Pay using bKash mobile wallet', emoji: '📱' },
                    { value: 'card', label: 'Credit/Debit Card', desc: 'Pay securely with your card', emoji: '💳' },
                  ].map(opt => (
                    <label key={opt.value} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      payment === opt.value ? 'border-orange-400 bg-orange-50' : 'border-sky-100 hover:border-sky-200'
                    }`}>
                      <input type="radio" name="payment" value={opt.value}
                        checked={payment === opt.value} onChange={e => setPayment(e.target.value)}
                        className="accent-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{opt.emoji}</span>
                          <span className="font-semibold text-sm text-gray-800">{opt.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-sky-100 p-5 sticky top-20">
                <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-600">
                      <span className="truncate mr-2">{item.qty}x {item.name}</span>
                      <span className="font-medium flex-shrink-0">৳{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Promo */}
                <div className="border-t border-sky-100 pt-3 mb-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())}
                        placeholder="Promo code" className="input-field pl-8 text-xs" />
                    </div>
                    <button type="button" onClick={applyPromo}
                      className="bg-orange-100 text-orange-500 text-xs font-semibold px-3 rounded-lg hover:bg-orange-200 transition-colors">
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-red-400 text-xs mt-1">{promoError}</p>}
                  {promoApplied && (
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-500 text-xs font-medium">
                        "{promoApplied}" applied – {Math.round(PROMO_CODES[promoApplied]*100)}% off!
                      </span>
                      <button onClick={() => { setPromoApplied(null); setPromo(''); }} className="ml-1 text-gray-400 hover:text-gray-600">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm border-t border-sky-100 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span><span>৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={delivery === 0 ? 'text-green-500 font-medium' : ''}>{delivery === 0 ? 'FREE' : `৳${delivery}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>VAT (5%)</span><span>৳{vat}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500 font-medium">
                      <span>Promo Discount</span><span>−৳{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-sky-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span className="text-orange-500">৳{total}</span>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary py-3 mt-4">
                  Place Order
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  You'll be charged ৳{total} on delivery
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
