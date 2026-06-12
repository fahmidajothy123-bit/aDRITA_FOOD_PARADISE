import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Package, Clock, Star, Award, TrendingUp, ArrowRight, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { user, orders } = useApp();

  if (!user) return <Navigate to="/login" />;

  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const active = orders.filter(o => o.status !== 'Delivered').length;

  const statusStyle = (status) => {
    if (status === 'Delivered') return 'badge-delivered';
    if (status === 'Out for Delivery') return 'badge-out-for-delivery';
    if (status === 'Preparing') return 'badge-preparing';
    return 'badge-pending';
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 page-enter">
      <div className="bg-white border-b border-sky-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-0">My Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, <strong>{user.name}</strong> 👋</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/80">Loyalty Points</span>
              <Award className="w-5 h-5 text-white/60" />
            </div>
            <div className="text-3xl font-extrabold" style={{fontFamily:'Poppins,sans-serif'}}>
              {user.loyaltyPoints}
            </div>
            <p className="text-white/70 text-xs mt-1">Points earned</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-sky-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Orders</span>
              <Package className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-extrabold text-gray-800" style={{fontFamily:'Poppins,sans-serif'}}>
              {orders.length}
            </div>
            <p className="text-gray-400 text-xs mt-1">{delivered} delivered</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-sky-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Active Orders</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-gray-800" style={{fontFamily:'Poppins,sans-serif'}}>
              {active}
            </div>
            <p className="text-gray-400 text-xs mt-1">In progress</p>
          </div>
        </div>

        {/* Active Orders */}
        {active > 0 && (
          <div className="bg-white rounded-2xl border border-sky-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Active Orders</h2>
              <Link to="/track-order" className="text-orange-500 text-sm font-medium flex items-center gap-1 hover:underline">
                Track All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {orders.filter(o => o.status !== 'Delivered').map(order => (
                <div key={order.id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-800">{order.id}</span>
                      <span className={statusStyle(order.status)}>{order.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {order.items.map(i => i.name).join(', ')}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-500 text-sm">৳{order.total}</p>
                    <Link to="/track-order" state={{ orderId: order.id }}
                      className="text-xs text-orange-500 hover:underline flex items-center gap-1 justify-end mt-1">
                      <Eye className="w-3 h-3" /> Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order History */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Order History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-sky-100">
                  <th className="text-left pb-3 font-semibold">Order ID</th>
                  <th className="text-left pb-3 font-semibold">Date</th>
                  <th className="text-left pb-3 font-semibold hidden md:table-cell">Items</th>
                  <th className="text-left pb-3 font-semibold">Total</th>
                  <th className="text-left pb-3 font-semibold">Status</th>
                  <th className="text-left pb-3 font-semibold hidden sm:table-cell">Rating</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-sky-50 last:border-0">
                    <td className="py-3 font-semibold text-orange-500 text-xs">{order.id}</td>
                    <td className="py-3 text-gray-600 text-xs">{order.date}</td>
                    <td className="py-3 text-gray-600 text-xs hidden md:table-cell max-w-[180px] truncate">
                      {order.items.map(i => i.name).join(', ')}
                    </td>
                    <td className="py-3 font-semibold text-gray-800 text-xs">৳{order.total}</td>
                    <td className="py-3">
                      <span className={statusStyle(order.status)}>{order.status}</span>
                    </td>
                    <td className="py-3 hidden sm:table-cell">
                      {order.rating ? (
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < order.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">–</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}