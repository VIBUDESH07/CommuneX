const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let events = [];

// Get all community events
router.get('/events', (req, res) => {
    if (events.length === 0) {
        return res.status(200).json({ success: true, message: 'No events found. Start by adding one to connect with the community!', events });
    }
    res.status(200).json({ success: true, events });
});

// Get a specific event by ID
router.get('/events/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (event) {
        res.status(200).json({ success: true, event });
    } else {
        res.status(404).json({ success: false, message: 'Event not found. It might have been removed or never existed.' });
    }
});

// Create a new community event
router.post('/events', (req, res) => {
    const { id, name, description, date, location } = req.body;

    if (!id || !name || !description || !date || !location) {
        return res.status(400).json({ success: false, message: 'All fields are required to create a new event. Please provide complete details.' });
    }

    if (events.some(e => e.id === id)) {
        return res.status(400).json({ success: false, message: 'An event with this ID already exists. Please use a unique ID.' });
    }

    const newEvent = { id, name, description, date, location };
    events.push(newEvent);
    res.status(201).json({ success: true, message: 'Event created successfully! Share this with your community.', event: newEvent });
});

// Update an existing event
router.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, date, location } = req.body;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found. Ensure the event ID is correct.' });
    }

    events[eventIndex] = { ...events[eventIndex], name, description, date, location };
    res.status(200).json({ success: true, message: 'Event updated successfully! Keep your community informed.', event: events[eventIndex] });
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    const { id } = req.params;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found. It may have already been removed.' });
    }

    events.splice(eventIndex, 1);
    res.status(200).json({ success: true, message: 'Event deleted successfully. Encourage more events for better community engagement!' });
});

module.exports = router;
