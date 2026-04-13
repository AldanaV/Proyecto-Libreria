import express from "express";
import { createOrder, getOrderByUser } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:id", getOrderByUser);

export default router;