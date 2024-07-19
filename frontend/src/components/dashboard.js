import React from 'react';
import TicketList from './TicketList';
import TicketForm from './TicketForm';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <TicketForm />
      <TicketList />
    </div>
  );
}

export default Dashboard;
