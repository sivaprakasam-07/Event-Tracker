const { createEvent, getEvents} = require("../Controller/eventController.js"); 
const router = require('express').Router();

router.post('/createEvent', createEvent);
router.get('/getEvents',getEvents);

module.exports = router;