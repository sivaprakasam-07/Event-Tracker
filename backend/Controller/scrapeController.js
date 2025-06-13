const puppeteer = require("puppeteer");
const ScrapedEvent = require("../Models/scrapedEvent");

// DEVPOST SCRAPER
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

        res.status(200).json({ message: "Devpost scraping done", count: savedCount });
    } catch (err) {
        console.error("Devpost scrape failed:", err);
        res.status(500).json({ message: "Scraping failed", error: err.message });
    }
};

// UNSTOP SCRAPER
const scrapeUnstop = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto("https://unstop.com/competitions", {
            waitUntil: "networkidle2",
        });

        const events = await page.evaluate(() => {
            const items = document.querySelectorAll('.single_profile');
            const result = [];

            items.forEach((item) => {
                const title = item.querySelector('h2')?.innerText?.trim();
                const org = item.querySelector('p')?.innerText?.trim();
                const link = item.getAttribute("onclick")?.match(/location.href='(.*?)'/)?.[1] ||
                    item.querySelector("a")?.href ||
                    "https://unstop.com";

                const fullUrl = link.startsWith("http") ? link : `https://unstop.com${link}`;

                if (title && fullUrl) {
                    result.push({
                        title: `${title} - ${org}`,
                        url: fullUrl,
                        type: "hackathon", // or use "competition" as general
                        source: "Unstop",
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

        res.status(200).json({ message: "Unstop scraping done", count: savedCount });
    } catch (err) {
        console.error("Unstop scrape failed:", err);
        res.status(500).json({ message: "Scraping failed", error: err.message });
    }
};

// FETCH SCRAPED EVENTS
const getScrapedEvents = async (req, res) => {
    try {
        const { type, source } = req.query; // Get query parameters
        const filter = {}; // Initialize an empty filter object

        if (type) {
            filter.type = type.toLowerCase(); // Add type to filter if provided and convert to lowercase
        }
        if (source) {
            filter.source = source; // Add source to filter if provided
        }

        // Use the filter in the find query
        const events = await ScrapedEvent.find(filter);
        res.status(200).json(events);
    } catch (err) {
        console.error("Failed to get scraped events:", err);
        res.status(500).json({ message: "Failed to retrieve events", error: err.message });
    }
};

module.exports = {
    scrapeDevpost,
    scrapeUnstop,
    getScrapedEvents,
};
