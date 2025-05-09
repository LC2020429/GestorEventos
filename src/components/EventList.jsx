import React, { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import ConfirmDelete from "./ConfirmDelete";
import "../assets/list.css";

const EventList = ({ setSelectedEvent }) => {
  const { state, dispatch } = useContext(EventContext);
  const { events, filters } = state;

  const [eventToDelete, setEventToDelete] = useState(null);

  const filteredEvents = events.filter((event) => {
    const filterByPriority =
      filters.priority === "all" || event.priority === filters.priority;

    const now = new Date();
    const filterByDate =
      filters.date === "all" ||
      (filters.date === "upcoming" && new Date(event.date) >= now) ||
      (filters.date === "past" && new Date(event.date) < now);

    return filterByPriority && filterByDate;
  });

  const handleEdit = (event) => {
    setSelectedEvent(event); // Pass the selected event to the parent component
  };

  const confirmDelete = () => {
    dispatch({ type: "DELETE_EVENT", payload: eventToDelete.id });
    toast.success("Evento eliminado");
    setEventToDelete(null);
  };

  return (
    <div className="event-list-container">
      {filteredEvents.length === 0 ? (
        <p className="no-events">
          No hay eventos con los filtros seleccionados.
        </p>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-content">
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <p className="event-meta">
                    {format(parseISO(event.date), "PPPp")} — 🏷 {event.category}
                  </p>
                  <p className="event-priority">Prioridad: {event.priority}</p>
                </div>
                <div className="event-actions">
                  <button
                    onClick={() => handleEdit(event)}
                    className="btn edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setEventToDelete(event)}
                    className="btn delete-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {eventToDelete && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={() => setEventToDelete(null)}
        />
      )}
    </div>
  );
};

export default EventList;
