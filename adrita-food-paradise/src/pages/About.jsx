import React from 'react';
import { Award, Heart, Users, TrendingUp, Target } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '50+', label: 'Menu Items' },
    { value: '4.8', label: 'Average Rating' },
    { value: '100%', label: 'Fresh Ingredients' },
  ];

  const values = [
    { icon: <Award className="w-6 h-6 text-orange-400" />, title: 'Quality First', desc: 'We never compromise on the quality of our food. The love we put into every dish speaks for itself.' },
    { icon: <Heart className="w-6 h-6 text-orange-400" />, title: 'Made with Love', desc: 'Every meal is prepared with full attention to detail, just like home cooking.' },
    { icon: <Users className="w-6 h-6 text-orange-400" />, title: 'Customer Focus', desc: 'Your satisfaction is our priority. We care, we listen, and we deliver excellence.' },
    { icon: <TrendingUp className="w-6 h-6 text-orange-400" />, title: 'Innovation', desc: 'We continuously evolve our menu to surpass your expectations.' },
  ];

  return (
    <div className="min-h-screen bg-sky-50 pt-16 page-enter">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3" style={{fontFamily:'Poppins,sans-serif'}}>
            About Adrita's Food Paradise
          </h1>
          <p className="text-white/80 text-lg">
            Where passion meets flavor, creating unforgettable dining experiences since 2024
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Adrita's Food Paradise was born from a simple dream: to create a place where exceptional food meets warm hospitality. Founded by Adrita Saklain Adrita, our restaurant combines traditional cooking methods with modern culinary innovation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Every dish we serve tells a story. From our signature Adrita Special Burger to our perfectly grilled salmon, each recipe has been crafted with care, using only the freshest ingredients sourced from local suppliers. Our chefs bring years of experience and genuine passion to the kitchen, ensuring that every meal is a celebration of flavor.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Located in the heart of Chittagong at CDA 1 No. C block, we've become more than just a restaurant — we're a community gathering place where families celebrate, friends reunite, and memories are made over delicious food.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm text-center">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h3 className="font-semibold text-gray-800 text-sm">Expert Chefs</h3>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm text-center">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="font-semibold text-gray-800 text-sm">Fresh Ingredients</h3>
            </div>
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 shadow-sm text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-semibold text-gray-800 text-sm">Made with Love</h3>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-800 text-sm">Fast Delivery</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-sky-100 hover:shadow-sm transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-sky-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-extrabold text-orange-400 mb-1" style={{fontFamily:'Poppins,sans-serif'}}>
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-orange-400 to-rose-400 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Our Mission</h2>
          <p className="text-white/90 text-base leading-relaxed">
            To provide an exceptional dining experience by combining fresh, high-quality ingredients with authentic recipes and outstanding service. We strive to create a welcoming atmosphere where every guest feels like family, and every meal becomes a cherished memory.
          </p>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-50 rounded-2xl border border-sky-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4 text-center">Project Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Project: </span>
                <span className="text-gray-800 font-medium">Final Year – E-Commerce Restaurant Website</span>
              </div>
              <div>
                <span className="text-gray-500">Owner: </span>
                <span className="text-gray-800 font-medium">Adrita Saklain Adrita</span>
              </div>
              <div>
                <span className="text-gray-500">Student ID: </span>
                <span className="text-gray-800 font-medium">221231</span>
              </div>
              <div>
                <span className="text-gray-500">Institution: </span>
                <span className="text-gray-800 font-medium">Educational Project</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}