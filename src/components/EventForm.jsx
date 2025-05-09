import React, { useState, useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import { toast } from "react-toastify";
import "../assets/formAdd.css";

const initialState = {
  title: "",
  description: "",
  date: "",
  category: "personal",
  priority: "media", // Agregado para la prioridad
  reminder: { enabled: false, time: "" },
};

const EventForm = ({ eventToEdit, clearEdit }) => {
  const [formData, setFormData] = useState(initialState);
  const { dispatch } = useContext(EventContext);

  useEffect(() => {
    if (eventToEdit) {
      setFormData(eventToEdit);
    } else {
      setFormData(initialState);
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "reminder") {
      setFormData({
        ...formData,
        reminder: { ...formData.reminder, enabled: checked },
      });
    } else if (name === "reminderTime") {
      setFormData({
        ...formData,
        reminder: { ...formData.reminder, time: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (eventToEdit) {
      setFormData(eventToEdit); // Carga los datos del evento a editar
    } else {
      setFormData(initialState); // Resetea el formulario si no hay nada para editar
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date) {
      toast.error("El título y la fecha son obligatorios");
      return;
    }

    if (eventToEdit) {
      dispatch({ type: "UPDATE_EVENT", payload: formData });
      toast.success("Evento actualizado");
    } else {
      dispatch({
        type: "ADD_EVENT",
        payload: { ...formData, id: crypto.randomUUID() },
      });
      toast.success("Evento creado");
    }

    setFormData(initialState);
    clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {eventToEdit ? "Editar Evento" : "Nuevo Evento"}
      </h2>
      <div className="mb-2">
        <label className="block text-sm font-medium">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Fecha y hora</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="reunión">Reunión</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Prioridad</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="reminder"
            checked={formData.reminder.enabled}
            onChange={handleChange}
          />
          <span>Agregar recordatorio</span>
        </label>
        {formData.reminder.enabled && (
          <input
            type="time"
            name="reminderTime"
            value={formData.reminder.time}
            onChange={handleChange}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
        >
          {eventToEdit ? "Actualizar" : "Guardar"}
        </button>
        {eventToEdit && (
          <button
            type="button"
            onClick={() => {
              clearEdit();
              setFormData(initialState);
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
