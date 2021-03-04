import { combineReducers } from "redux";
import { action, createReducer } from "typesafe-actions";

export const OPEN_ERROR = "snackbar/OPEN_ERROR";
export const OPEN_LOADER = "snackbar/OPEN_LOADER";
export const OPEN_CREATED = "snackbar/OPEN_CREATED";
export const OPEN_UPDATED = "snackbar/OPEN_UPDATED";
export const CLOSE_ALERT = "snackbar/CLOSE_ALERT";

export const openError = (errorString: string) =>
  action(OPEN_ERROR, errorString);

export const openLoader = (message: string = "") =>
  action(OPEN_LOADER, message);

export const openCreated = (errorString: string) =>
  action(OPEN_CREATED, errorString);

export const openUpdated = (errorString: string) =>
  action(OPEN_UPDATED, errorString);

export const clearAlert = () => action(CLOSE_ALERT);

export const actions = {
  openError,
  clearAlert,
  openLoader,
  openCreated,
  openUpdated,
};

// reducer
export type UtilsType = Readonly<{
  snackbar: {
    isOpen: boolean;
    message: string | null;
    type: string | null;
  };
  isLoading: boolean;
}>;

const initialState: UtilsType = {
  snackbar: {
    isOpen: false,
    message: null,
    type: null,
  },
  isLoading: false,
};

const snackbar = createReducer(initialState.snackbar)
  .handleType(OPEN_LOADER, (_, action) => {
    return {
      isOpen: true,
      message: action.payload,
      type: "info",
    };
  })
  .handleType(OPEN_ERROR, (_, action) => {
    return {
      isOpen: true,
      message: action.payload,
      type: "error",
    };
  })
  .handleType([OPEN_CREATED], (_, action) => ({
    isOpen: true,
    type: "success",
    message: action.payload,
  }))
  .handleType(CLOSE_ALERT, (state) => ({
    isOpen: false,
    message: state.message,
    type: "info",
  }));

const isLoading = createReducer(initialState.isLoading)
  .handleType([OPEN_LOADER], () => true)
  .handleType(
    [OPEN_UPDATED, OPEN_CREATED, OPEN_ERROR, CLOSE_ALERT],
    () => false
  );

export const reducer = combineReducers({
  snackbar,
  isLoading,
});
