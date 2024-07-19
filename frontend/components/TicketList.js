import React, { useState, useEffect } from 'react';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('/api/tickets')
      .then(response => response.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div className="ticket-list">
      <h3>Tickets</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            {ticket.title} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
