import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: "#ORD-2026-003", date: "2026-09-23",
      items: [{ name: "Margherita Pizza", qty: 1, price: 600 }, { name: "Chocolate Lava Cake", qty: 1, price: 350 }],
      total: 930, status: "Out for Delivery", trackingStep: 2,
    },
    {
      id: "#ORD-2026-002", date: "2026-09-22",
      items: [{ name: "Grilled Salmon", qty: 1, price: 1050 }, { name: "Caesar Salad", qty: 1, price: 380 }],
      total: 1505, status: "Delivered", trackingStep: 4, rating: 4,
    },
    {
      id: "#ORD-2026-001", date: "2026-09-21",
      items: [{ name: "Adrita Special Burger", qty: 1, price: 650 }, { name: "French Fries", qty: 2, price: 440 }],
      total: 1050, status: "Delivered", trackingStep: 4, rating: 4,
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('afp_cart');
      const savedWishlist = localStorage.getItem('afp_wishlist');
      const savedUser = localStorage.getItem('afp_user');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('afp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('afp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(w => w.id === item.id);
      if (exists) return prev.filter(w => w.id !== item.id);
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => wishlist.some(w => w.id === id);
  const isInCart = (id) => cart.some(c => c.id === id);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const login = (userData) => {
    const u = { name: userData.name || "Adrita", email: userData.email, loyaltyPoints: 220 };
    setUser(u);
    localStorage.setItem('afp_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('afp_user');
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `#ORD-2026-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
      total: orderData.total,
      status: "Order Placed",
      trackingStep: 0,
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  };

  return (
    <AppContext.Provider value={{
      cart, wishlist, user, orders,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, isInCart,
      cartTotal, cartCount,
      login, logout,
      placeOrder,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
