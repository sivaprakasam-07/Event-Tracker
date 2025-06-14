const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// const CreateEvent = require("./models/createEvent"); // Old model
const CreateEventEng = require("./Models/CreateEventEng"); // Corrected path
const CreateEventTech = require("./Models/CreateEventTech"); // Corrected path

mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function exportManualEvents() {
    try {
        const engEvents = await CreateEventEng.find();
        const techEvents = await CreateEventTech.find();

        let output = "Generated on: " + new Date().toLocaleString() + "\n\n";
        output += "------------------------------------\n";
        output += "    ENGINEERING EVENTS (Manual)    \n";
        output += "------------------------------------\n\n";

        if (engEvents.length === 0) {
            output += "No manually created Engineering events found.\n\n";
        } else {
            output += engEvents.map((ev, index) => {
                return `Event ${index + 1} (Engineering):
Title: ${ev.title}
Date: ${ev.date ? new Date(ev.date).toDateString() : 'N/A'}
Time: ${ev.time || 'N/A'}
Venue: ${ev.venue || 'N/A'}
Event Link: ${ev.eventLink || 'N/A'}
Description: ${ev.description || 'N/A'}
Department: ${ev.department || 'N/A'}
Eligibility: ${ev.eligibility || 'N/A'}
Poster URL: ${ev.posterUrl || 'N/A'}
\n`;
            }).join("\n");
        }

        output += "\n------------------------------------\n";
        output += "    TECHNOLOGY EVENTS (Manual)     \n";
        output += "------------------------------------\n\n";

        if (techEvents.length === 0) {
            output += "No manually created Technology events found.\n\n";
        } else {
            output += techEvents.map((ev, index) => {
                return `Event ${index + 1} (Technology):
Title: ${ev.title}
Date: ${ev.date ? new Date(ev.date).toDateString() : 'N/A'}
Time: ${ev.time || 'N/A'}
Venue: ${ev.venue || 'N/A'}
Event Link: ${ev.eventLink || 'N/A'}
Description: ${ev.description || 'N/A'}
Department: ${ev.department || 'N/A'}
Eligibility: ${ev.eligibility || 'N/A'}
Poster URL: ${ev.posterUrl || 'N/A'}
\n`;
            }).join("\n");
        }

        fs.writeFileSync("manual_events.txt", output);
        console.log("✅ manual_events.txt created with manually created Engineering and Technology events.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to export events:", err);
        process.exit(1);
    }
}

exportManualEvents();
