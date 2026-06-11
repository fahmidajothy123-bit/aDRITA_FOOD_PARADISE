import React, { useState } from 'react';
import { CalendarDays, Users, Clock, CheckCircle2, Star, Shield, Utensils, ThumbsUp } from 'lucide-react';

export default function Reservations() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: 2, occasion: '', requests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = ['11:00 AM','12:00 PM','1:00 PM','2:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'];
  const occasions = ['Birthday','Anniversary','Business Dinner','Date Night','Family Gathering','Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-sky-50 pt-16 flex items-center justify-center page-enter">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-4 shadow-sm border border-sky-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reservation Confirmed!</h2>
          <p className="text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>!</p>
          <p className="text-gray-500 text-sm mb-6">
            Your table for <strong>{form.guests} guests</strong> is booked for{' '}
            <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            A confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',date:'',time:'',guests:2,occasion:'',requests:'' }); }}
            className="btn-primary"
          >
            Book Another Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 pt-16 page-enter">
      {/* Header */}
      <div className="bg-white border-b border-sky-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Reserve a Table</h1>
          <p className="section-subtitle">Book your table at Adrita's Food Paradise</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Reservation Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      required placeholder="Your name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      required placeholder="you@email.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    required placeholder="+880..."
                    className="input-field"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="date" type="date" value={form.date} onChange={handleChange}
                      required min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Time <span className="text-red-400">*</span>
                    </label>
                    <select name="time" value={form.time} onChange={handleChange} required className="input-field">
                      <option value="">Select a time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Number of Guests <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2.5">
                      <button type="button" onClick={() => setForm(p => ({...p, guests: Math.max(1, p.guests-1)}))}
                        className="w-6 h-6 bg-white rounded-full border border-sky-200 flex items-center justify-center text-gray-600 font-bold hover:border-orange-400 hover:text-orange-500 transition-colors">
                        −
                      </button>
                      <span className="font-semibold text-gray-800 min-w-[20px] text-center">{form.guests}</span>
                      <button type="button" onClick={() => setForm(p => ({...p, guests: Math.min(20, p.guests+1)}))}
                        className="w-6 h-6 bg-white rounded-full border border-sky-200 flex items-center justify-center text-gray-600 font-bold hover:border-orange-400 hover:text-orange-500 transition-colors">
                        +
                      </button>
                      <span className="text-xs text-gray-500 ml-1">Guests</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={handleChange} className="input-field">
                      <option value="">Select occasion</option>
                      {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Special Requests</label>
                  <textarea
                    name="requests" value={form.requests} onChange={handleChange}
                    rows={3} placeholder="e.g., Window seat, dietary restrictions, high chair needed..."
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-3 text-base mt-2">
                  Confirm Reservation
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Why Reserve */}
            <div className="bg-orange-500 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-base mb-4">Why Reserve with Us?</h3>
              <ul className="space-y-3">
                {[
                  { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Guaranteed Seating' },
                  { icon: <Utensils className="w-4 h-4" />, text: 'Priority Service' },
                  { icon: <Star className="w-4 h-4" />, text: 'Special Occasions Handled' },
                  { icon: <ThumbsUp className="w-4 h-4" />, text: 'Flexible Booking' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reservation Policy */}
            <div className="bg-white rounded-2xl border border-sky-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-sm text-gray-800">Reservation Policy</h3>
              </div>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>• Please arrive 5–10 minutes before your booking time.</li>
                <li>• Tables are held for 15 minutes past the reservation time.</li>
                <li>• Minimum 2 hours notice required for cancellation.</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-sky-100 p-5">
              <h3 className="font-bold text-sm text-gray-800 mb-3">Contact Us</h3>
              <p className="text-xs text-gray-500 mb-1">📞 +8801855608532</p>
              <p className="text-xs text-gray-500 mb-1">📍 Bashundhara, CDA 1 No. C block, Chittagong</p>
              <p className="text-xs text-gray-500">🕐 Mon–Sun: 11:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
