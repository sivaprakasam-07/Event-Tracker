const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Models and Routes
require("./Models/config");
const uploadRoute = require("./Routes/Upload");
const uploadRoutes = require("./Routes/UploadRoutes");
const ScrapeRouter = require("./Routes/ScrapeRouter");
const EventRouter = require("./Routes/EventsRouter");
const authRoutes = require("./Routes/auth");
const knowafestRouter = require("./Routes/knowafestRouter"); // Added Knowafest router

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true
}));
app.use(express.json());

// MongoDB (Mongoose) for authentication and event data
mongoose
  .connect("mongodb://127.0.0.1:27017/eventtracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/event", EventRouter);
app.use("/api", uploadRoute);
app.use("/api", ScrapeRouter);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes); // ✅ Login/auth route
app.use("/api/scrape", knowafestRouter); // Added Knowafest route

// PORT config
const PORT = process.env.PORT || 8080;

// MongoDB client for raw access (used in cron job)
const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Cron job to run daily at 11:45 PM
cron.schedule("45 23 * * *", async () => {
  try {
    await client.connect();
    const database = client.db("event-tracker1");
    const eventsCollection = database.collection("events");
    const participantsCollection = database.collection("participants");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

    const events = await eventsCollection
      .find({ date: { $gte: startOfDay, $lte: endOfDay } })
      .toArray();

    for (const event of events) {
      const participants = await participantsCollection
        .find({ eventId: event._id, willingness: true })
        .toArray();

      for (const participant of participants) {
        // ✉️ TODO: Add email sending logic here
      }
    }
  } catch (error) {
    console.error("❌ Failed to send reminder emails:", error);
  } finally {
    await client.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
