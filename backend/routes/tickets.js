const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  const newTicket = new Ticket(req.body);
  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
