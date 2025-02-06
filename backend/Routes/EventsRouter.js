const { createEvent, getEvents, deleteEvent } = require("../Controller/eventController.js");
const router = require('express').Router();

router.post('/createEvent', createEvent);
router.get('/getEvents', getEvents);
router.delete('/deleteEvent/:id', deleteEvent);

module.exports = router;