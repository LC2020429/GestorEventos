import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";

const FilterControls = () => {
  const { state, setFilters } = useContext(EventContext);
  const { filters } = state;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="filter-container">
      <select
        name="priority"
        value={filters.priority}
        onChange={handleFilterChange}
      >
        <option value="all">Prioridad</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <select name="date" value={filters.date} onChange={handleFilterChange}>
        <option value="all">Fecha</option>
        <option value="upcoming">Próximos</option>
        <option value="past">Pasados</option>
      </select>
    </div>
  );
};

export default FilterControls;
