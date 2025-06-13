const { createEvent, getEvents, deleteEvent, updateParticipants, upload } = require("../Controller/eventController.js");
const router = require('express').Router();

router.post('/createEvent', upload, createEvent);
router.get('/getEvents', getEvents);
router.get('/events', getEvents);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateParticipants/:id', updateParticipants);
const express = require("express");

module.exports = router;