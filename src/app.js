import express from "express";

/* all import routes */
import { router as authRoutes } from "./routes/auth.routes.js";
export const app = express();
app.use(express.json());
/* using all the routes here */
app.use("/api/auth",authRoutes)

