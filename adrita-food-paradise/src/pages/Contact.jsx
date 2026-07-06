import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { apiRequest } from '../config/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Real backend call: POST /api/contact
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 pt-16 page-enter">
      {/* Header */}
      <div className="bg-white border-b border-sky-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-gray-800">Send us a Message</h2>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-4">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }}
                    className="btn-primary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name <span className="text-red-400">*</span></label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email <span className="text-red-400">*</span></label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+880..." className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject <span className="text-red-400">*</span></label>
                    <input name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      required rows={5} placeholder="Write your message here..."
                      className="input-field resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                    <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-orange-500 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-5">Get in Touch</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: 'Address',
                    lines: ['Bashundhara, CDA 1 No. C block', 'Chittagong, Bangladesh'],
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: 'Phone',
                    lines: ['+8801855608532'],
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: 'Email',
                    lines: ['contact@adritafoodparadise.com'],
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Business Hours',
                    lines: ['Monday – Sunday', '11:00 AM – 10:00 PM'],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{item.title}</p>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-white/80 text-xs">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner info */}
            <div className="bg-white rounded-2xl border border-sky-100 p-5">
              <h3 className="font-bold text-sm text-gray-800 mb-3">Owner Information</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Adrita Saklain Adrita</p>
                  <p className="text-xs text-gray-500">ID: 221231</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Feel free to reach out directly for any special arrangements or queries.</p>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-sky-100 overflow-hidden h-40 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                <p className="text-xs">Bashundhara, Chittagong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}