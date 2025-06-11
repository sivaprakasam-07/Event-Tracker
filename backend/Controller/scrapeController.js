const puppeteer = require("puppeteer");
const ScrapedEvent = require("../Models/scrapedEvent");

const scrapeDevpost = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto("https://devpost.com/hackathons", {
            waitUntil: "networkidle2",
        });

        const events = await page.evaluate(() => {
            const tiles = document.querySelectorAll(".hackathon-tile");
            const result = [];
            tiles.forEach((tile) => {
                const title = tile.querySelector("h3")?.innerText;
                const link = tile.querySelector("a.tile-anchor")?.href;
                if (title && link) {
                    result.push({
                        title,
                        url: link,
                        type: "hackathon",
                        source: "Devpost",
                    });
                }
            });
            return result;
        });

        await browser.close();

        let savedCount = 0;
        for (const event of events) {
            const exists = await ScrapedEvent.findOne({ url: event.url });
            if (!exists) {
                await ScrapedEvent.create(event);
                savedCount++;
            }
        }

        res.status(200).json({ message: "Scraped successfully", count: savedCount });
    } catch (err) {
        console.error("Scrape failed:", err);
        res.status(500).json({ message: "Scraping failed", error: err.message });
    }
};

const getScrapedEvents = async (req, res) => {
    try {
        const events = await ScrapedEvent.find({});
        res.status(200).json(events);
    } catch (err) {
        console.error("Failed to get scraped events:", err);
        res
            .status(500)
            .json({ message: "Failed to retrieve events", error: err.message });
    }
};

module.exports = {
    scrapeDevpost,
    getScrapedEvents,
};
