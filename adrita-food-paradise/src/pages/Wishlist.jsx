import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StarRating } from '../components/MenuCard';

const foodEmojis = {
  'Spicy Chicken Wings':'🍗','Caesar Salad':'🥗','Adrita Special Burger':'🍔',
  'Grilled Chicken Steak':'🥩','Beef Lasagna':'🍝','Margherita Pizza':'🍕',
  'Grilled Salmon':'🐟','Vegetable Biryani':'🍛','Chocolate Lava Cake':'🍫',
  'Tiramisu':'🍰','Fresh Lime Soda':'🥤','Coffee':'☕','French Fries':'🍟',
  'Garlic Bread':'🥖','Onion Rings':'🧅','Mango Smoothie':'🥭','Vegetable Spring Rolls':'🥢',
};

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-sky-50 pt-16 flex items-center justify-center page-enter">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-9 h-9 text-red-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Save your favorite dishes here!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 pt-16 page-enter">
      <div className="bg-white border-b border-sky-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-0">My Wishlist</h1>
          <p className="text-gray-500 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map(item => (
            <div key={item.id} className="card group">
              <div className="relative bg-gradient-to-br from-orange-50 to-sky-50 h-36 flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {foodEmojis[item.name] || '🍽️'}
                </span>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3.5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                  <span className="text-orange-500 font-bold text-sm ml-1">৳{item.price}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <StarRating rating={item.rating} />
                  <span className="text-xs text-orange-500 font-semibold">{item.rating}</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
