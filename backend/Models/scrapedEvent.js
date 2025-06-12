const mongoose = require("mongoose");

const scrapedEventSchema = new mongoose.Schema({
    title: String,
    url: String,
    type: String, // e.g. "hackathon"
    source: String, // e.g. "Devpost"
    dateScraped: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ScrapedEvent", scrapedEventSchema);
