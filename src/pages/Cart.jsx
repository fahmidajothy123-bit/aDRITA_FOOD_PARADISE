import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();

  const delivery = cartTotal >= 800 ? 0 : 60;
  const vat = Math.round(cartTotal * 0.05);
  const total = cartTotal + delivery + vat;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-sky-50 pt-16 flex items-center justify-center page-enter">
        <div className="text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-9 h-9 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Add some delicious items from our menu!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 pt-16 page-enter">
      <div className="bg-white border-b border-sky-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-0">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-sky-100 p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-sky-50 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
                  {{'Spicy Chicken Wings':'🍗','Caesar Salad':'🥗','Adrita Special Burger':'🍔','Grilled Chicken Steak':'🥩','Beef Lasagna':'🍝','Margherita Pizza':'🍕','Grilled Salmon':'🐟','Vegetable Biryani':'🍛','Chocolate Lava Cake':'🍫','Tiramisu':'🍰','Fresh Lime Soda':'🥤','Coffee':'☕','French Fries':'🍟','Garlic Bread':'🥖','Onion Rings':'🧅','Mango Smoothie':'🥭','Vegetable Spring Rolls':'🥢'}[item.name] || '🍽️'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                  <p className="text-orange-500 font-bold text-sm">৳{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-7 h-7 rounded-full border border-sky-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-semibold text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-7 h-7 rounded-full border border-sky-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-right min-w-[60px]">
                  <p className="font-bold text-gray-800 text-sm">৳{item.price * item.qty}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors ml-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <Link to="/menu" className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-medium hover:underline mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-sky-100 p-5 sticky top-20">
              <h2 className="font-bold text-gray-800 mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={delivery === 0 ? 'text-green-500 font-medium' : ''}>
                    {delivery === 0 ? 'FREE' : `৳${delivery}`}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-xs text-green-500">🎉 Free delivery on orders above ৳800!</p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>VAT (5%)</span>
                  <span>৳{vat}</span>
                </div>
                <div className="border-t border-sky-100 pt-3 flex justify-between font-bold text-gray-800 text-base">
                  <span>Total</span>
                  <span className="text-orange-500">৳{total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center gap-2 mt-5 py-3"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
