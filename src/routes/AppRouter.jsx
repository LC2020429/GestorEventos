import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
  );
}

export default App;
