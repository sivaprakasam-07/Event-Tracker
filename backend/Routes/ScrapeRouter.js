const express = require("express");
const router = express.Router();
const {
    scrapeDevpost,
    getScrapedEvents,
} = require("../Controller/scrapeController");

router.get("/scrape-devpost", scrapeDevpost);
router.get("/scraped-events", getScrapedEvents);

module.exports = router;
