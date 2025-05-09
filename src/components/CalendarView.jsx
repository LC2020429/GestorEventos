import React, { useContext, useState, useMemo } from "react";
import Calendar from "react-calendar";
import { EventContext } from "../context/EventContext";
import { format, isSameDay, parseISO, isValid } from "date-fns";
import '../assets/calendarView.css';
const CalendarView = () => {
  const { state } = useContext(EventContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const eventsOfDay = useMemo(() => {
    return state.events.filter((event) =>
      isSameDay(parseISO(event.date), selectedDate)
    );
  }, [state.events, selectedDate]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Calendario de Eventos</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={({ date, view }) => {
          const dayEvents = state.events.filter((ev) =>
            isSameDay(parseISO(ev.date), date)
          );

          return (
            <div className="text-center mt-1">
              {dayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="text-[10px] text-blue-600 truncate"
                  title={ev.title}
                >
                  • {ev.title}
                </div>
              ))}
            </div>
          );
        }}
      />

      {/* Este bloque es opcional si quieres mostrar detalles del día seleccionado */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">
          Eventos del {format(selectedDate, "PPP")}
        </h3>

        {eventsOfDay.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {eventsOfDay.map((ev) => (
              <li
                key={ev.id}
                className="border p-3 rounded-lg shadow-sm bg-white hover:bg-gray-50"
              >
                <strong>{ev.title}</strong> — {ev.category}
                <div className="text-sm text-gray-600">
                  {format(parseISO(ev.date), "p")}
                </div>
                {ev.reminder?.enabled &&
                  isValid(parseISO(ev.reminder.time)) && (
                    <div className="text-xs text-blue-500 mt-1">
                      Recordatorio: {format(parseISO(ev.reminder.time), "p")}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No hay eventos para este día.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
