import express from "express";
import { createOrder, getOrderByUser, getAllOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:id", getOrderByUser);
router.get("/admin/orders", verifyToken, isAdmin, getAllOrders);
router.put("/admin/orders/:id", verifyToken, isAdmin, updateOrderStatus);

router.get("/:id", getOrderById);

export default router;