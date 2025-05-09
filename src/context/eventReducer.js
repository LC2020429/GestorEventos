const SET_FILTERS = "SET_FILTERS";

export const eventReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((ev) => ev.id !== action.payload),
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};
