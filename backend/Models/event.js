const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    eventLink: { type: String },
    description: { type: String, required: true },
    department: { type: String, required: true },
    eligibility: { type: String, required: true },
    participants: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
