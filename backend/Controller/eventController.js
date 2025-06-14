const CreateEventEng = require("../models/CreateEventEng"); // New model
const CreateEventTech = require("../models/CreateEventTech"); // New model
const { MongoClient } = require("mongodb");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig"); // ✅ Corrected file path
require("dotenv").config();

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Multer Config - Upload to Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("pamphlet");

// 🎉 Create Event with Pamphlet Upload
const createEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      venue,
      eventLink,
      description,
      department,
      eligibility,
      posterUrl: posterUrlFromBody, // <-- get posterUrl from body
      eventType // Added eventType to distinguish between Eng and Tech
    } = req.body;

    let posterUrl = posterUrlFromBody || ""; // Use posterUrl from body if present

    if (req.file) {
      // 🔥 Upload to Cloudinary if file is uploaded
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "event_pamphlets" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      posterUrl = result.secure_url;
    }

    let event;
    if (eventType === "Eng") {
      event = new CreateEventEng({
        title,
        date,
        time,
        venue,
        eventLink,
        description,
        department,
        eligibility,
        posterUrl,
      });
    } else if (eventType === "Tech") {
      event = new CreateEventTech({
        title,
        date,
        time,
        venue,
        eventLink,
        description,
        department,
        eligibility,
        posterUrl,
      });
    } else {
      return res.status(400).json({
        message: "Invalid event type",
        success: false,
      });
    }

    await event.save();
    console.log("Created event", event);

    // 🎯 Fetch users from DB if needed
    await client.connect();
    const database = client.db("event-tracker1");
    const usersCollection = database.collection("users");
    const users = await usersCollection.find({}).toArray();

    res.status(201).json({
      message: "Created event successfully",
      success: true,
      event,
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({
      message: "An error occurred while creating the event",
      success: false,
    });
  } finally {
    await client.close();
  }
};

// 🎯 Get Events
const getEvents = async (req, res) => {
  try {
    const { eventType } = req.query; // Get eventType from query params
    let events;

    if (eventType === "Eng") {
      events = await CreateEventEng.find();
    } else if (eventType === "Tech") {
      events = await CreateEventTech.find();
    } else {
      // If no eventType is specified, or an invalid one, return an error or all events
      // For now, returning an error.
      return res.status(400).json({
        message: "Please specify a valid event type (Eng or Tech)",
        success: false,
      });
    }

    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Fetched events successfully",
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the data",
      success: false,
    });
  }
};

// 🎯 Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventType } = req.query; // Added eventType to distinguish

    let deletedEvent;
    if (eventType === "Eng") {
      deletedEvent = await CreateEventEng.findByIdAndDelete(id);
    } else if (eventType === "Tech") {
      deletedEvent = await CreateEventTech.findByIdAndDelete(id);
    } else {
      return res.status(400).json({
        message: "Invalid event type for deletion",
        success: false,
      });
    }

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Deleted event successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while deleting the event",
      success: false,
    });
  }
};

// 🎯 Update Participants
const updateParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const { participants, eventType } = req.body; // Added eventType

    let event;
    if (eventType === "Eng") {
      event = await CreateEventEng.findByIdAndUpdate(
        id,
        { participants },
        { new: true }
      );
    } else if (eventType === "Tech") {
      event = await CreateEventTech.findByIdAndUpdate(
        id,
        { participants },
        { new: true }
      );
    } else {
      return res.status(400).json({
        message: "Invalid event type for updating participants",
        success: false,
      });
    }

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Participants updated successfully",
      success: true,
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while updating participants",
      success: false,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  updateParticipants,
  upload, // ✅ Export upload to be used in the route
};
