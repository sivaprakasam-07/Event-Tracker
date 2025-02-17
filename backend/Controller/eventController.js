const CreateEvent = require("../models/createEvent");
const { sendEmail } = require("../services/emailService");
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
            eligibility
        } = req.body;

        const event = new CreateEvent({
            title,
            date,
            time,
            venue,
            eventLink,
            description,
            department,
            eligibility
        });

        await event.save();
        console.log("Created event", event);

        // Fetch users from the database
        await client.connect();
        const database = client.db('event-tracker1');
        const usersCollection = database.collection('users');
        const users = await usersCollection.find({}).toArray();

        // Send email to all users
        for (const user of users) {
            await sendEmail(
                user.email,
                `New Event Created: ${title}`,
                `Dear ${user.name},\n\nA new event "${title}" has been created.\n\nBest regards,\nEvent Tracker Team`
            );
        }

        res.status(201).json({
            message: "Created event successfully",
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred while creating event",
            success: false
        });
    } finally {
        await client.close();
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await CreateEvent.find();
        if (events.length == 0) {
            return res.status(404).json({
                message: "No events found",
                success: false
            });
        }
        res.status(200).json({
            message: "Fetched events successfully",
            success: true,
            events
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while fetching the data",
            success: false
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await CreateEvent.findByIdAndDelete(id);
        res.status(200).json({
            message: "Deleted event successfully",
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred while deleting event",
            success: false
        });
    }
};

const updateParticipants = async (req, res) => {
    try {
        const { id } = req.params;
        const { participants } = req.body;

        const event = await CreateEvent.findByIdAndUpdate(id, { participants }, { new: true });

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Participants updated successfully",
            success: true,
            event
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred while updating participants",
            success: false
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    deleteEvent,
    updateParticipants
};