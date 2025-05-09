import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRouter";
import { EventProvider } from "./context/EventContext";
import "./assets/index.css";
function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <AppRoutes />
      </EventProvider>
    </BrowserRouter>
  );
}

export default App;
