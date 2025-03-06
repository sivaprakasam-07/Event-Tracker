const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Statistics', statisticsSchema);
