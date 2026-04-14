import express from "express";
import { createOrder, getOrderByUser } from "../controllers/orderController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:id", getOrderByUser);
router.get("/admin/orders", verifyToken, isAdmin, getAllOrders);

export default router;