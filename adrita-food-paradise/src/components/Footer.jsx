import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-sm" style={{fontFamily:'Poppins,sans-serif'}}>
                Adrita's Food Paradise
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Experience the finest cuisine with exceptional service. We serve happiness on every plate.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/menu', label: 'Menu' },
                { to: '/reservations', label: 'Reservations' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/about', label: 'About Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Bashundhara, CDA 1 No. C block<br />Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>+8801855608532</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>contact@adritafoodparadise.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Mon–Sun: 11:00 AM – 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Owner Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">About the Owner</h4>
            <div className="text-sm text-gray-400 space-y-1.5">
              <p>Name: Adrita Saklain Adrita</p>
              <p>ID: 221231</p>
            </div>
            <div className="mt-5">
              <h5 className="text-white text-sm font-medium mb-2">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © 2026 Adrita's Food Paradise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
