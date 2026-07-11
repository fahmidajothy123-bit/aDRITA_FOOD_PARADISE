import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  rateOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/rate", protect, rateOrder);

export default router;
