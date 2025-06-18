const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questRoutes = require("./routes/questRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/rewards", rewardRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("🎇 Solo Sparks API is running...");
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`.yellow.bold)
);
