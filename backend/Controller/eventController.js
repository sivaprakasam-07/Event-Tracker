const CreateEvent = require("../models/createEvent");

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

module.exports = {
    createEvent,
    getEvents,
    deleteEvent
};