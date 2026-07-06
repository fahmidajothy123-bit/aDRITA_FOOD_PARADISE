import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, Package, Truck, Home, HeadphonesIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const steps = [
  { label: 'Order Placed', icon: <CheckCircle2 className="w-5 h-5" />, time: '3:30 PM' },
  { label: 'Preparing', icon: <Clock className="w-5 h-5" />, time: '3:45 PM' },
  { label: 'Out for Delivery', icon: <Truck className="w-5 h-5" />, time: '4:10 PM' },
  { label: 'Delivered', icon: <Home className="w-5 h-5" />, time: 'Est. 5:15 PM' },
];

export default function TrackOrder() {
  const { orders } = useApp();
  const location = useLocation();
  const targetId = location.state?.orderId;

  const activeOrder = targetId
    ? orders.find(o => o.id === targetId)
    : orders.find(o => o.status !== 'Delivered') || orders[0];

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center page-enter">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No orders to track</h2>
          <p className="text-gray-500 text-sm mb-5">Place an order first to track it here.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  const currentStep = activeOrder.trackingStep ?? 2;

  return (
    <div className="min-h-screen bg-slate-50 pt-16 page-enter">
      <div className="bg-white border-b border-sky-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-0">Track Your Order</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time order status</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-sky-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-bold text-gray-800">{activeOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Placed on</p>
                <p className="font-semibold text-sm text-gray-700">{activeOrder.date} at 3:30 PM</p>
              </div>
            </div>

            {/* Steps */}
            <div className="relative">
              {steps.map((step, index) => {
                const isDone = index <= currentStep;
                const isActive = index === currentStep;
                return (
                  <div key={index} className="flex gap-4 mb-0">
                    {/* Icon + line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                        isDone
                          ? isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-0.5 h-12 mt-1 transition-colors ${index < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold text-sm ${isDone ? 'text-gray-800' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          {isActive && (
                            <p className="text-xs text-orange-500 mt-0.5">
                              Your order is currently being {step.label.toLowerCase()}...
                            </p>
                          )}
                          {!isActive && isDone && (
                            <p className="text-xs text-green-500 mt-0.5">Completed</p>
                          )}
                        </div>
                        <span className={`text-xs ${isDone ? 'text-gray-500' : 'text-gray-300'}`}>{step.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {currentStep === 3 && (
              <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-green-700">Your order has been delivered!</p>
                <p className="text-xs text-green-600 mt-1">We hope you enjoyed your meal 😊</p>
              </div>
            )}

            {/* Delivery Info */}
            <div className="mt-6 border-t border-sky-100 pt-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Delivery Information</h3>
              <p className="text-sm text-gray-600">📍 Bashundhara, CDA 1 No. C block, Chittagong</p>
              <p className="text-xs text-gray-500 mt-1">Est. Delivery Time: 5:15 PM</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-sky-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-600">
                    <span>{item.qty}x {item.name}</span>
                    <span>৳{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sky-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{activeOrder.items.reduce((s,i) => s + i.price*i.qty, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span><span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-orange-500">৳{activeOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl border border-sky-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <HeadphonesIcon className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-sm text-gray-800">Need Help?</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">Having an issue with your order?</p>
              <a href="tel:+8801855608532" className="w-full btn-primary text-sm py-2 block text-center">
                Contact Support
              </a>
            </div>

            {/* Other Orders */}
            {orders.length > 1 && (
              <div className="bg-white rounded-2xl border border-sky-100 p-5">
                <h3 className="font-bold text-sm text-gray-800 mb-3">Other Orders</h3>
                {orders.filter(o => o.id !== activeOrder.id).slice(0,2).map(o => (
                  <div key={o.id} className="flex justify-between items-center py-2 border-b border-sky-50 last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{o.id}</p>
                      <p className="text-xs text-gray-400">{o.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      o.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                      o.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>{o.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}