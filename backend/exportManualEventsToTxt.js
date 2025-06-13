const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const CreateEvent = require("./models/createEvent");

mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function exportManualEvents() {
    try {
        const events = await CreateEvent.find();

        const output = events.map((ev, index) => {
            return `Event ${index + 1}:
Title: ${ev.title}
Date: ${new Date(ev.date).toDateString()}
Time: ${ev.time}
Venue: ${ev.venue}
Event Link: ${ev.eventLink}
Description: ${ev.description}
Department: ${ev.department}
Eligibility: ${ev.eligibility}
Poster URL: ${ev.posterUrl}

`;
        }).join("\n");

        fs.writeFileSync("manual_events.txt", output);
        console.log("✅ manual_events.txt created with manually created events only.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to export events:", err);
        process.exit(1);
    }
}

exportManualEvents();
