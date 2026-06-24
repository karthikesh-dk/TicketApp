import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TicketList.css";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${id}`);

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tickets/${id}`, {
        status: newStatus,
      });

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>

      {tickets.length === 0 && <p>No Tickets Found</p>}

      {tickets.map((ticket) => (
        <div key={ticket._id} className="ticket-card">

          <h3>{ticket.title}</h3>

          <p>
            <strong>Description:</strong> {ticket.description}
          </p>

          <p>
            <strong>Priority:</strong> {ticket.priority}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                ticket.status === "open"
                  ? "status-open"
                  : ticket.status === "In progress"
                  ? "status-in-progress"
                  : "status-resolved"
              }
            >
              {ticket.status}
            </span>
          </p>

          <p>
            <strong>Created by:</strong> {ticket.createdby}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

          <div className="ticket-buttons">

            <button
              className="progress-btn"
              onClick={() =>
                updateStatus(ticket._id, "In progress")
              }
            >
              In Progress
            </button>

            <button
              className="resolve-btn"
              onClick={() =>
                updateStatus(ticket._id, "Resolved")
              }
            >
              Resolve
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTicket(ticket._id)}
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;