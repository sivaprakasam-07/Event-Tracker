const { createEvent, getEvents, deleteEvent, updateParticipants } = require("../Controller/eventController.js");
const router = require('express').Router();

router.post('/createEvent', createEvent);
router.get('/getEvents', getEvents);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateParticipants/:id', updateParticipants);

module.exports = router;