import { render, screen, fireEvent } from "@testing-library/react";
import { EventContext } from "../context/EventContext";
import EventForm from "../components/EventForm";

test("envía nuevo evento cuando se llena el formulario", () => {
  const mockDispatch = jest.fn();
  const clearEdit = jest.fn();

  render(
    <EventContext.Provider value={{ dispatch: mockDispatch }}>
      <EventForm clearEdit={clearEdit} />
    </EventContext.Provider>
  );

  fireEvent.change(screen.getByLabelText(/Título/i), {
    target: { value: "Reunión importante", name: "title" },
  });

  fireEvent.change(screen.getByLabelText(/Fecha y hora/i), {
    target: { value: "2025-05-08T10:00", name: "date" },
  });

  fireEvent.click(screen.getByText(/Guardar/i));

  expect(mockDispatch).toHaveBeenCalled();
  expect(clearEdit).toHaveBeenCalled();
});
