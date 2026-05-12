require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend Working Fine");
});

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("📦 MongoDB Connected"))
.catch(err => {
  console.error("❌ Mongo Error:", err);
  process.exit(1);
});

/* =========================
   ROUTES
========================= */
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/tracker", require("./routes/trackerRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});