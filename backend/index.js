const express = require("express");
const app = express();
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const cron = require('node-cron');
const { sendEmail } = require('./services/emailService');
const { MongoClient } = require('mongodb');
require('dotenv').config();
require('./Models/config.js');
const EventRouter = require('./Routes/EventsRouter');
app.use(express.json());
app.use(cors());

app.use("/event", EventRouter);
app.use('/api', uploadRoute);

const PORT = process.env.PORT || 8080;

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Schedule a cron job to run every day at 10:00 PM
cron.schedule('45 23 * * *', async () => {
    try {
      await client.connect();
      const database = client.db('event-tracker1');
      const eventsCollection = database.collection('events');
      const participantsCollection = database.collection('participants');
  
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
  
      const events = await eventsCollection.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      }).toArray();
  
      for (const event of events) {
        const participants = await participantsCollection.find({
          eventId: event._id,
          willingness: true // Check if the participant is willing to participate
        }).toArray();
  
        for (const participant of participants) {
          await sendEmail(
            participant.email,
            `Reminder: Upcoming Event - ${event.name}`,
            `Dear ${participant.name},\n\nThis is a reminder for the upcoming event "${event.name}" happening on ${event.date}.\n\nBest regards,\nEvent Tracker Team`
          );
        }
      }
    } catch (error) {
      console.error('Failed to send reminder emails:', error);
    } finally {
      await client.close();
    }
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});