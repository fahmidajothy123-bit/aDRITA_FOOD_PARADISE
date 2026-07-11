import asyncHandler from 'express-async-handler';
import MenuItem from '../models/MenuItem.js';

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenu = asyncHandler(async (req, res) => {
  const items = await MenuItem.find({}).sort({ itemId: 1 });
  res.json(items);
});

// @desc    Get a single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  res.json(item);
});
