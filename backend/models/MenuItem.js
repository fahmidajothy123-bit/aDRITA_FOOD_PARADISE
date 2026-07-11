import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    tags: [{ type: String }],
    image: { type: String, default: null },
    isPopular: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
