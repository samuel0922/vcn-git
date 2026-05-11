const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const todoRouter = require("./routers/todoRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo backend is running" });
});

app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set in environment variables.");
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
