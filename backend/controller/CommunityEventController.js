const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let events = [];

// Get all community events
router.get('/events', (req, res) => {
    res.status(200).json({ success: true, events });
});

// Get a specific event by ID
router.get('/events/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (event) {
        res.status(200).json({ success: true, event });
    } else {
        res.status(404).json({ success: false, message: 'Event not found' });
    }
});

// Create a new community event
router.post('/events', (req, res) => {
    const { id, name, description, date, location } = req.body;

    if (!id || !name || !description || !date || !location) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newEvent = { id, name, description, date, location };
    events.push(newEvent);
    res.status(201).json({ success: true, message: 'Event created successfully', event: newEvent });
});

// Update an existing event
router.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, date, location } = req.body;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found' });
    }

    events[eventIndex] = { ...events[eventIndex], name, description, date, location };
    res.status(200).json({ success: true, message: 'Event updated successfully', event: events[eventIndex] });
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    const { id } = req.params;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found' });
    }

    events.splice(eventIndex, 1);
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
});

module.exports = router;
