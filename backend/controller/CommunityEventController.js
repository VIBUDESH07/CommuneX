const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let events = [];
let users = []; // Mock users database for user management

// Middleware to check if user exists
const validateUser = (req, res, next) => {
    const { userId } = req.body;
    if (!users.some(user => user.id === userId)) {
        return res.status(404).json({ success: false, message: 'User not found. Please register first.' });
    }
    next();
};

// Get all events for a specific user
router.get('/events', (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required to fetch events.' });
    }

    const userEvents = events.filter(event => event.userId === userId);
    if (userEvents.length === 0) {
        return res.status(200).json({ success: true, message: 'No events found for this user. Start by adding one!', events: userEvents });
    }

    res.status(200).json({ success: true, events: userEvents });
});

// Get a specific event by ID for a user
router.get('/events/:id', (req, res) => {
    const { userId } = req.query;
    const { id } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required to fetch the event.' });
    }

    const event = events.find(e => e.id === id && e.userId === userId);
    if (event) {
        res.status(200).json({ success: true, event });
    } else {
        res.status(404).json({ success: false, message: 'Event not found for this user.' });
    }
});

// Create a new community event
router.post('/events', validateUser, (req, res) => {
    const { id, name, description, date, location, userId } = req.body;

    if (!id || !name || !description || !date || !location || !userId) {
        return res.status(400).json({ success: false, message: 'All fields are required to create a new event.' });
    }

    if (events.some(e => e.id === id)) {
        return res.status(400).json({ success: false, message: 'An event with this ID already exists. Please use a unique ID.' });
    }

    const newEvent = { id, name, description, date, location, userId };
    events.push(newEvent);
    res.status(201).json({ success: true, message: 'Event created successfully!', event: newEvent });
});

// Update an existing event
router.put('/events/:id', validateUser, (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, userId } = req.body;

    const eventIndex = events.findIndex(e => e.id === id && e.userId === userId);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found for this user.' });
    }

    events[eventIndex] = { ...events[eventIndex], name, description, date, location };
    res.status(200).json({ success: true, message: 'Event updated successfully!', event: events[eventIndex] });
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const eventIndex = events.findIndex(e => e.id === id && e.userId === userId);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found for this user.' });
    }

    events.splice(eventIndex, 1);
    res.status(200).json({ success: true, message: 'Event deleted successfully!' });
});

module.exports = router;
