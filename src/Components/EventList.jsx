import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./Common/https";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}events`);
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure to delete this event?")) {
      try {
        await axios.delete(`${API_BASE_URL}events/${id}`);
        fetchEvents();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Events List</h2>

      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Add New Event
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Organizer</th>
              <th>Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No events found.
                </td>
              </tr>
            )}

            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.event_name}</td>
                <td>{event.event_description}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>{event.organizer}</td>
                <td>
                  <ul className="mb-0 ps-3">
                    {event.tickets.map((t) => (
                      <li key={t.id}>
                        {t.ticket_no} — ₹{t.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/events/edit/${event.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
