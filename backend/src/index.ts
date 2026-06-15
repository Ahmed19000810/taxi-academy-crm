import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Taxi Academy API is running", timestamp: new Date().toISOString() });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error", message: process.env.NODE_ENV === "development" ? err.message : undefined });
});

app.listen(PORT, () => {
  console.log("Backend server running on http://localhost:" + PORT);
  console.log("Health check: http://localhost:" + PORT + "/api/health");
});

export default app;