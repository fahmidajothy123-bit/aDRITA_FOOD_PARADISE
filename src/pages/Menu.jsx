import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { menuItems, categories } from '../data/menuData';
import MenuCard from '../components/MenuCard';
import api from '../api/client';

const spiceLevels = ['Mild', 'Medium', 'Extra Spicy'];
const dietaryFilters = ['Veg', 'Non-Veg', 'Gluten Free', 'Keto'];

export default function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [spiceLevel, setSpiceLevel] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState(menuItems);

  // Load menu from the backend; keep bundled data as a fallback if it fails
  useEffect(() => {
    api.getMenu()
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setItems(data.map(d => ({ ...d, id: d.itemId ?? d._id })));
        }
      })
      .catch(() => { /* keep local fallback */ });
  }, []);

  const toggleDietary = (d) => {
    setSelectedDietary(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const filtered = useMemo(() => {
    let list = [...items];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') {
      list = list.filter(i => i.category === activeCategory);
    }
    if (selectedDietary.length > 0) {
      list = list.filter(i => selectedDietary.some(d => i.tags.includes(d)));
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [items, search, activeCategory, selectedDietary, sortBy]);

  return (
    <div className="min-h-screen bg-sky-50 pt-16 page-enter">
      {/* Header */}
      <div className="bg-white border-b border-sky-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Our Menu</h1>
          <p className="section-subtitle">Discover our delicious selection</p>
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for dishes..."
              className="input-field pl-10 pr-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-sky-100 p-4 sticky top-20">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Filters</h3>

              {/* Category */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Category</p>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        activeCategory === cat
                          ? 'bg-orange-500 text-white font-medium'
                          : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Dietary Preferences</p>
                <div className="space-y-1.5">
                  {dietaryFilters.map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedDietary.includes(d)}
                        onChange={() => toggleDietary(d)}
                        className="accent-orange-500 w-3.5 h-3.5"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-orange-500">{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Spice Level</p>
                {spiceLevels.map(s => (
                  <label key={s} className="flex items-center gap-2 mb-1.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="spice"
                      value={s}
                      checked={spiceLevel === s}
                      onChange={() => setSpiceLevel(spiceLevel === s ? '' : s)}
                      className="accent-orange-500 w-3.5 h-3.5"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-orange-500">{s}</span>
                  </label>
                ))}
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Sort By</p>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {(selectedDietary.length > 0 || spiceLevel || sortBy || activeCategory !== 'All') && (
                <button
                  onClick={() => { setSelectedDietary([]); setSpiceLevel(''); setSortBy(''); setActiveCategory('All'); }}
                  className="w-full mt-4 text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 justify-center"
                >
                  <X className="w-3 h-3" /> Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter toggle + category tabs */}
            <div className="lg:hidden mb-4 flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border border-sky-200 bg-white px-3 py-2 rounded-lg text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="flex gap-1.5 overflow-x-auto pb-1 flex-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white border border-sky-200 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span> items found
              </p>
              <div className="hidden lg:block">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field text-xs w-44"
                >
                  <option value="">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No items found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
