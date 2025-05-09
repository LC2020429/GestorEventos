import React, { createContext, useReducer, useEffect } from "react";
import { eventReducer } from "./eventReducer";

const SET_FILTERS = "SET_FILTERS";

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || [],
  filters: {
    priority: "all", 
    date: "all",
  },
};

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state.events));
  }, [state.events]);

  const setFilters = (filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  return (
    <EventContext.Provider value={{ state, dispatch, setFilters }}>
      {children}
    </EventContext.Provider>
  );
};
