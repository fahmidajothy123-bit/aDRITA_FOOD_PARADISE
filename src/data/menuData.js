export const menuItems = [
  {
    id: 1, name: "Spicy Chicken Wings", price: 450, category: "Appetizer",
    description: "Crispy wings tossed in our signature spicy sauce with blue cheese dip.",
    rating: 4.8, reviews: 124, tags: ["Spicy", "Non-Veg"], image: null,
    isPopular: true, isNew: false,
  },
  {
    id: 2, name: "Caesar Salad", price: 380, category: "Appetizer",
    description: "Fresh romaine lettuce with parmesan, croutons, and classic caesar dressing.",
    rating: 4.6, reviews: 89, tags: ["Veg", "Healthy"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 3, name: "Vegetable Spring Rolls", price: 320, category: "Appetizer",
    description: "Crispy rolls filled with fresh vegetables and herbs.",
    rating: 4.5, reviews: 67, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 4, name: "Adrita Special Burger", price: 650, category: "Main Course",
    description: "Double patty burger with caramelized onions, cheese, lettuce, and special sauce.",
    rating: 4.9, reviews: 203, tags: ["Non-Veg", "Spicy"], image: null,
    isPopular: true, isNew: false,
  },
  {
    id: 5, name: "Grilled Chicken Steak", price: 750, category: "Main Course",
    description: "Tender chicken breast grilled to perfection with herb butter sauce.",
    rating: 4.7, reviews: 156, tags: ["Non-Veg"], image: null,
    isPopular: true, isNew: false,
  },
  {
    id: 6, name: "Beef Lasagna", price: 850, category: "Main Course",
    description: "Slow-cooked beef, ricotta, and mozzarella layered between pasta sheets.",
    rating: 4.7, reviews: 98, tags: ["Non-Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 7, name: "Margherita Pizza", price: 600, category: "Main Course",
    description: "Fresh mozzarella, tomatoes, basil, and olive oil on crispy thin crust.",
    rating: 4.6, reviews: 178, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 8, name: "Grilled Salmon", price: 1050, category: "Main Course",
    description: "Atlantic salmon fillet grilled with lemon-herb butter and seasonal vegetables.",
    rating: 4.8, reviews: 112, tags: ["Non-Veg", "Healthy"], image: null,
    isPopular: true, isNew: false,
  },
  {
    id: 9, name: "Vegetable Biryani", price: 480, category: "Main Course",
    description: "Aromatic basmati rice cooked with fresh vegetables and special spices.",
    rating: 4.5, reviews: 145, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 10, name: "Chocolate Lava Cake", price: 350, category: "Dessert",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream.",
    rating: 4.9, reviews: 234, tags: ["Veg"], image: null,
    isPopular: true, isNew: false,
  },
  {
    id: 11, name: "Tiramisu", price: 420, category: "Dessert",
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
    rating: 4.7, reviews: 89, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 12, name: "Fresh Lime Soda", price: 150, category: "Beverage",
    description: "Refreshing lime soda with mint and a hint of salt.",
    rating: 4.6, reviews: 203, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 13, name: "Coffee", price: 200, category: "Beverage",
    description: "Freshly brewed arabica coffee, served hot or cold.",
    rating: 4.8, reviews: 312, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 14, name: "French Fries", price: 220, category: "Sides",
    description: "Golden crispy fries seasoned with our secret spice blend.",
    rating: 4.7, reviews: 445, tags: ["Veg"], image: null,
    isPopular: false, isNew: true,
  },
  {
    id: 15, name: "Garlic Bread", price: 180, category: "Sides",
    description: "Toasted bread with garlic butter and herbs.",
    rating: 4.5, reviews: 189, tags: ["Veg"], image: null,
    isPopular: false, isNew: true,
  },
  {
    id: 16, name: "Onion Rings", price: 240, category: "Sides",
    description: "Beer-battered onion rings, extra crispy.",
    rating: 4.4, reviews: 134, tags: ["Veg"], image: null,
    isPopular: false, isNew: false,
  },
  {
    id: 17, name: "Mango Smoothie", price: 280, category: "Beverage",
    description: "Fresh mango blended with yogurt, slightly sweet.",
    rating: 4.9, reviews: 267, tags: ["Veg", "Healthy"], image: null,
    isPopular: true, isNew: false,
  },
];

export const categories = ["All", "Appetizer", "Main Course", "Dessert", "Beverage", "Sides"];

export const reviews = [
  {
    id: 1, name: "Mohammad Rahman", avatar: "MR", rating: 5,
    comment: "The Adrita Special Burger is absolutely amazing! Fresh ingredients and great service. Will definitely come back.",
    date: "2 days ago",
  },
  {
    id: 2, name: "Fatima Begum", avatar: "FB", rating: 4,
    comment: "The Grilled Salmon was perfectly cooked. The chocolate lava cake is divine. Will definitely order again!",
    date: "5 days ago",
  },
  {
    id: 3, name: "Ahmed Ali", avatar: "AA", rating: 5,
    comment: "Great variety of food and quick delivery. The chocolate lava cake is definitely a must-try!",
    date: "1 week ago",
  },
];

export const orderHistory = [
  {
    id: "#ORD-2026-001", date: "2026-09-21", items: "Adrita Special Burger, 2 Fresh Fries",
    total: 1050, status: "Delivered", rating: 4,
  },
  {
    id: "#ORD-2026-002", date: "2026-09-22", items: "Grilled Salmon, Caesar Salad",
    total: 1505, status: "Delivered", rating: 4,
  },
];

export const activeOrders = [
  {
    id: "#ORD-2026-003", date: "2026-09-23", items: "Margherita Pizza, Chocolate Lava Cake",
    total: 930, status: "Out for Delivery",
  },
];
