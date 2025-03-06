const express = require('express');
const { createEvent, getEvents, deleteEvent, updateParticipants, updateEvent } = require('../Controller/eventController');
const { authenticate } = require('../Controller/authController');

const router = express.Router();

router.post('/createEvent', authenticate, createEvent);
router.get('/getEvents', authenticate, getEvents);
router.delete('/deleteEvent/:id', authenticate, deleteEvent);
router.put('/updateParticipants/:id', authenticate, updateParticipants);
router.put('/updateEvent/:id', authenticate, updateEvent);

module.exports = router;