import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    passengerName: '',
    busNumber: '',
    seatNumber: '',
    date: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/api/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEdit) {
      try {
        await axios.put(`/api/tickets/${editId}`, form);
        setIsEdit(false);
        setEditId(null);
      } catch (err) {
        console.error("Error updating ticket:", err);
      }
    } else {
      try {
        await axios.post('/api/tickets', form);
      } catch (err) {
        console.error("Error creating ticket:", err);
      }
    }

    fetchTickets();
    setForm({ passengerName: '', busNumber: '', seatNumber: '', date: '' });
  };

  const deleteTicket = async id => {
    try {
      await axios.delete(`/api/tickets/${id}`);
      fetchTickets();
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

/*  const editTicket = ticket => {
    setForm({
      passengerName: ticket.passengerName,
      busNumber: ticket.busNumber,
      seatNumber: ticket.seatNumber,
      date: ticket.date
    });
    setIsEdit(true);
    setEditId(ticket._id);
  };*/

  return (
    <div className="app">
      <header className="header">
        <h1>🚌 Bus Ticket Reservation</h1>
      </header>

      <main className="main">
        <form className="form" onSubmit={handleSubmit}>
          <input name="passengerName" placeholder="Name" value={form.passengerName} onChange={handleChange} required />
          <input name="busNumber" placeholder="Bus Number" value={form.busNumber} onChange={handleChange} required />
          <input name="seatNumber" placeholder="Seat Number" type="number" value={form.seatNumber} onChange={handleChange} required />
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
          <button type="submit">{isEdit ? 'Update Ticket' : 'Book Ticket'}</button>
        </form>

        <div className="ticket-list">
          {tickets.map(ticket => (
            <div key={ticket._id} className="ticket-card">
              <p><strong>{ticket.passengerName}</strong></p>
              <p>🚌 Bus {ticket.busNumber} — Seat {ticket.seatNumber}</p>
              <p>📅 {new Date(ticket.date).toDateString()}</p>
              <button className="cancel-btn" onClick={() => deleteTicket(ticket._id)}>Cancel</button>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Bus Reservation System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
