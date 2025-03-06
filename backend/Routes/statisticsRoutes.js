const express = require('express');
const { getStatistics, updateStatistics, deleteStatistics } = require('../Controller/statisticsController');

const router = express.Router();

router.get('/statistics', getStatistics);
router.post('/statistics', updateStatistics);
router.delete('/statistics/:id', deleteStatistics);

module.exports = router;
