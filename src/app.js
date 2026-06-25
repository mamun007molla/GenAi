import express from "express";
import cookieParser from "cookie-parser";
/* all import routes */
import { router as authRoutes } from "./routes/auth.routes.js";

export const app = express();
app.use(express.json());
app.use(cookieParser());
/* using all the routes here */
app.use("/api/auth", authRoutes);
