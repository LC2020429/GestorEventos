import React, { useState, useContext } from "react";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import Navbar from "../components/NavBar";
import FilterControls from "../components/FilterControls";
import "../assets/home.css";

const HomePage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { state, setFilters } = useContext(EventContext);
  const { filters } = state;

  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedEvent(null); 
  };

  return (
    <div className="home-container">
      <Navbar />
      <FilterControls />
      <EventList
        setSelectedEvent={(event) => {
          setSelectedEvent(event);
          setShowForm(true);
        }}
      />

      <button className="add-button" onClick={toggleFormVisibility}>
        {showForm ? "Cancelar" : "Agregar Tarea"}
      </button>

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <EventForm
              eventToEdit={selectedEvent}
              clearEdit={() => {
                setSelectedEvent(null);
                setShowForm(false);
              }}
            />
            <button onClick={closeForm} className="modal-close">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
