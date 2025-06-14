const express = require('express');
const router = express.Router();
const { scrapeKnowafestHackathons } = require('../Controller/knowafestController');

// Route to trigger scraping for Knowafest hackathons
router.get('/knowafest-hackathons', scrapeKnowafestHackathons);

module.exports = router;
