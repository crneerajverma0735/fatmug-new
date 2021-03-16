import { SET_ALERT, REMOVE_ALERT } from "../actions/Types";

const initialState = {
  type: "",
  message: "",
};

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...state, type: payload.alertType, message: payload.msg };

    case REMOVE_ALERT:
      return initialState;
    default:
      return state;
  }
}
