import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat, Leaf, Zap, Truck, Star, ShoppingCart, ArrowRight, Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { menuItems, reviews } from '../data/menuData';
import { StarRating } from '../components/MenuCard';

const specialDishes = menuItems.filter(m => m.isPopular).slice(0, 6);

const foodEmojis = {
  'Spicy Chicken Wings': '🍗', 'Caesar Salad': '🥗', 'Adrita Special Burger': '🍔',
  'Grilled Chicken Steak': '🥩', 'Grilled Salmon': '🐟', 'Chocolate Lava Cake': '🍫',
  'Mango Smoothie': '🥭',
};

export default function Home() {
  const { addToCart } = useApp();

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-gradient min-h-[420px] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 fill-white" /> Rated #1 Restaurant in Chittagong
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4" style={{fontFamily:'Poppins,sans-serif'}}>
              Welcome to<br />Adrita's Food<br />Paradise
            </h1>
            <p className="text-white/80 text-base mb-8 max-w-md leading-relaxed">
              Experience culinary excellence with every bite. Fresh ingredients, authentic flavors, delivered to your door.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/menu" className="btn-outline flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> View Menu
              </Link>
              <Link to="/reservations" className="bg-white text-orange-500 hover:bg-orange-50 font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Book a Table
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-52 h-52 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-8xl">🍽️</span>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -left-8 bg-white rounded-xl px-3 py-2 shadow-lg">
                <div className="text-xs font-bold text-gray-800">4.9 ⭐</div>
                <div className="text-[10px] text-gray-500">500+ Reviews</div>
              </div>
              <div className="absolute -bottom-2 -right-6 bg-white rounded-xl px-3 py-2 shadow-lg">
                <div className="text-xs font-bold text-orange-500">Free Delivery</div>
                <div className="text-[10px] text-gray-500">Orders above ৳800</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ChefHat className="w-7 h-7 text-orange-500" />, title: 'Expert Chefs', desc: 'Prepared by experienced culinary experts' },
              { icon: <Leaf className="w-7 h-7 text-orange-500" />, title: 'Quality Food', desc: 'Fresh ingredients, naturally prepared' },
              { icon: <Zap className="w-7 h-7 text-orange-500" />, title: 'Fast Service', desc: 'Quick preparation and delivery to you' },
              { icon: <Truck className="w-7 h-7 text-orange-500" />, title: 'Free Delivery', desc: 'On orders above ৳800' },
            ].map((f, i) => (
              <div key={i} className="text-center p-5 rounded-xl border border-sky-100 hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Dishes */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Special Dishes</h2>
            <p className="section-subtitle">Handpicked favorites loved by our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialDishes.map(dish => (
              <div key={dish.id} className="card group overflow-visible">
                <div className="bg-gradient-to-br from-orange-50 to-sky-50 h-36 flex items-center justify-center rounded-t-xl">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {foodEmojis[dish.name] || '🍽️'}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{dish.name}</h3>
                    <span className="text-orange-500 font-bold text-sm">৳{dish.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={dish.rating} />
                    <span className="text-xs text-gray-400">({dish.reviews})</span>
                  </div>
                  <button
                    onClick={() => addToCart(dish)}
                    className="w-full btn-primary text-xs py-2"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(r => (
              <div key={r.id} className="p-5 rounded-xl border border-sky-100 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{r.name}</div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={r.rating} />
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-gradient py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Tag className="w-4 h-4" /> Limited Time Offer
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
            First Order? Get 50% OFF!
          </h2>
          <p className="text-white/80 mb-6">Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">FIRST50</span> at checkout</p>
          <Link to="/menu" className="btn-outline inline-flex items-center gap-2 text-base">
            Start Ordering <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
