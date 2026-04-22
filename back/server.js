import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import booksRoute from "./routes/booksRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/books", booksRoute);

app.listen(5000, () => {
    console.log("Servidor en puerto 5000")
});