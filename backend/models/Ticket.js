const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  passengerName: String,
  busNumber: String,
  seatNumber: Number,
  date: Date
});

module.exports = mongoose.model('Ticket', TicketSchema);
