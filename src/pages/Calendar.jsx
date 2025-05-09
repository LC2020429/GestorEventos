import React from "react";
import CalendarView from "../components/CalendarView";
import Navbar from "../components/NavBar";
import "../assets/calendarPage.css";

export default function Calendar() {
  return (
    <div className="calendar-page-wrapper">
      <Navbar />
      <CalendarView />
    </div>
  );
}
