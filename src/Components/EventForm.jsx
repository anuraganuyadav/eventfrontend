import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "./Common/https";
import styles from "./css/common.module.css";
const EventForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Edit mode id
    const [eventData, setEventData] = useState({
        event_name: "",
        event_description: "",
        start_date: "",
        end_date: "",
        organizer: "",
        tickets: []
    });

    
    useEffect(() => {
        if (id) {
            axios.get(`${API_BASE_URL}events/${id}`)
                .then(res => setEventData(res.data))
                .catch(err => console.log(err));
        }
    }, [id]);

    
    const addTicket = () => {
        setEventData({
            ...eventData,
            tickets: [...eventData.tickets, { ticket_no: "", price: "" }]
        });
    };

    // Update ticket fields
    const updateTicket = (index, field, value) => {
        const updatedTickets = [...eventData.tickets];
        updatedTickets[index][field] = value;
        setEventData({ ...eventData, tickets: updatedTickets });
    };

    const removeTicket = async (index) => {
        const ticket = eventData.tickets[index];

        if (ticket.id) {
         
            try {
                await axios.delete(`${API_BASE_URL}tickets/${ticket.id}`);
            } catch (err) {
                console.log("Failed to delete ticket:", err);
                return;
            }
        }

       
        const updatedTickets = [...eventData.tickets];
        updatedTickets.splice(index, 1);
        setEventData({ ...eventData, tickets: updatedTickets });
    };

//  add and update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.post(`${API_BASE_URL}events/${id}`, eventData);
            } else {
                await axios.post(`${API_BASE_URL}events`, eventData);
            }
            navigate("/events");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            <div className={styles.eventlist}>
                <button className="btn btn-primary mb-3" onClick={() => navigate("/events")}>
                    List Event
                </button>
            </div>

            <h2 className={`${styles.formhead} mb-3`}>{id ? "Edit Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit} className={`${styles.formback} card p-4 shadow`}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Event Name"
                    value={eventData.event_name}
                    onChange={(e) => setEventData({ ...eventData, event_name: e.target.value })}
                    required
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Event Description"
                    value={eventData.event_description}
                    onChange={(e) => setEventData({ ...eventData, event_description: e.target.value })}
                />
                <div className="d-flex gap-2 mb-2">
                    <input
                        type="date"
                        className="form-control"
                        value={eventData.start_date}
                        onChange={(e) => setEventData({ ...eventData, start_date: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        className="form-control"
                        value={eventData.end_date}
                        onChange={(e) => setEventData({ ...eventData, end_date: e.target.value })}
                        required
                    />
                </div>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Organizer"
                    value={eventData.organizer}
                    onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                    required
                />

                <h5 className={styles.ticktname}>Tickets</h5>
                {eventData.tickets.map((ticket, index) => (
                    <div className="d-flex gap-2 mb-2" key={index}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ticket No"
                            value={ticket.ticket_no}
                            onChange={(e) => updateTicket(index, "ticket_no", e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            value={ticket.price}
                            onChange={(e) => updateTicket(index, "price", e.target.value)}
                        />
                        <button type="button" className="btn btn-danger" onClick={() => removeTicket(index)}>X</button>
                    </div>
                ))}
                <div className="mb-3 d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={addTicket}
                    >
                        Add Ticket
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        {id ? "Update" : "Save"} Event
                    </button>
                </div>


            </form>
        </div>
    );
};

export default EventForm;
