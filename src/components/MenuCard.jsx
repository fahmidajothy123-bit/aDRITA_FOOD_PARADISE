import React from 'react';
import { Heart, ShoppingCart, Star, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

function StarRating({ rating, size = 'sm' }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} ${
          i <= full ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
        }`}
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function MenuCard({ item }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const inWishlist = isInWishlist(item.id);
  const inCart = isInCart(item.id);

  const foodEmojis = {
    'Spicy Chicken Wings': '🍗',
    'Caesar Salad': '🥗',
    'Vegetable Spring Rolls': '🥢',
    'Adrita Special Burger': '🍔',
    'Grilled Chicken Steak': '🥩',
    'Beef Lasagna': '🍝',
    'Margherita Pizza': '🍕',
    'Grilled Salmon': '🐟',
    'Vegetable Biryani': '🍛',
    'Chocolate Lava Cake': '🍫',
    'Tiramisu': '🍰',
    'Fresh Lime Soda': '🥤',
    'Coffee': '☕',
    'French Fries': '🍟',
    'Garlic Bread': '🥖',
    'Onion Rings': '🧅',
    'Mango Smoothie': '🥭',
  };

  return (
    <div className="card group">
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-orange-50 to-sky-50 h-40 flex items-center justify-center overflow-hidden">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {foodEmojis[item.name] || '🍽️'}
        </div>
        {item.isPopular && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Popular
          </div>
        )}
        {item.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            New
          </div>
        )}
        <button
          onClick={() => toggleWishlist(item)}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
              tag === 'Veg' ? 'bg-green-100 text-green-700' :
              tag === 'Spicy' ? 'bg-red-100 text-red-700' :
              tag === 'Healthy' ? 'bg-blue-100 text-blue-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">{item.name}</h3>
          <span className="text-orange-500 font-bold text-sm ml-2 flex-shrink-0">৳{item.price}</span>
        </div>
        <p className="text-xs text-gray-500 mb-2.5 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={item.rating} />
          <span className="text-xs text-orange-500 font-semibold">{item.rating}</span>
          <span className="text-xs text-gray-400">({item.reviews})</span>
        </div>
        <button
          onClick={() => addToCart(item)}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            inCart
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {inCart ? (
            <><Plus className="w-3.5 h-3.5" /> Add More</>
          ) : (
            <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

export { StarRating };
