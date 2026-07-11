import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import MenuItem from '../models/MenuItem.js';
import { menuItems } from '../../src/data/menuData.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // Clear old menu items, then insert fresh from the source data
    await MenuItem.deleteMany({});

    const docs = menuItems.map((m) => ({
      itemId: m.id,
      name: m.name,
      price: m.price,
      category: m.category,
      description: m.description,
      rating: m.rating,
      reviews: m.reviews,
      tags: m.tags,
      image: m.image,
      isPopular: m.isPopular,
      isNew: m.isNew,
    }));

    await MenuItem.insertMany(docs);
    console.log(`✅ Seeded ${docs.length} menu items into MongoDB`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Seed failed: ${err.message}`);
    process.exit(1);
  }
};

seed();
