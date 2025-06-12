const express = require("express");
const router = express.Router();
const { scrapeDevpost, scrapeUnstop, getScrapedEvents, } = require("../Controller/scrapeController");

router.get("/scrape-devpost", scrapeDevpost);
router.get("/scrape-unstop", scrapeUnstop);
router.get("/scraped-events", getScrapedEvents);

module.exports = router;