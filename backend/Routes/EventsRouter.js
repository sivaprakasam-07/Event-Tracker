const { createEvent } = require("../Controller/eventController.js"); 
const router = require('express').Router();

router.post('/createEvent', createEvent);

module.exports = router;