const dns = require("dns");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

// Windows 등에서 IPv6 DNS가 막혀 querySrv ECONNREFUSED 가 날 때, IPv4 우선으로 SRV 조회
dns.setDefaultResultOrder("ipv4first");
const cors = require("cors");
const dotenv = require("dotenv");

const todoRouter = require("./routers/todoRouter");

dotenv.config({ path: path.join(__dirname, ".env") });

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
  if (String(error.message).includes("querySrv")) {
    console.error(
      "[MongoDB] mongodb+srv 는 DNS(SRV) 조회가 필요합니다. " +
        "DNS를 1.1.1.1 등으로 바꾸고 ipconfig /flushdns 후 재시도하거나, " +
        "Atlas의 mongodb:// 표준 연결 문자열을 MONGO_URI에 쓰거나, " +
        "로컬이면 MONGO_URI=mongodb://127.0.0.1:27017/todo-app 로 임시 전환하세요."
    );
  }
  process.exit(1);
});
