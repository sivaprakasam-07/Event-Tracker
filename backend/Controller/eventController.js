const CreateEvent = require("../models/createEvent");
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Event = require('../Models/event'); // Assuming you have an Event model

const createEvent = async (req, res) => {
    const eventData = req.body;
    try {
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
};

const getEvents = async (req, res) => {
    const filters = req.query;
    try {
        const events = await CreateEvent.find(filters);
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
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
};

const updateParticipants = async (req, res) => {
    const { id } = req.params;
    const { participants } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { participants }, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error updating participants' });
    }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, updateParticipants };