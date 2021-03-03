import { action, createReducer } from "typesafe-actions";

import { UserType } from "../../types/models";
import { combineReducers } from "redux";

export const UPDATE_CURRENT_USER = "user/UPDATE_CURRENT_USER";
export const REQUEST_CURRENT_USER = "user/REQUEST_CURRENT_USER";
export const LOGIN_USER = "user/LOGIN_USER";
export const LOGOUT_USER = "user/LOGOUT_USER";
export const UPDATE_UNIT_TYPE = "user/UPDATE_UNIT_TYPE";

// actions
export const requestCurrentUser = () => action(REQUEST_CURRENT_USER);
export const logoutUser = () => action(LOGOUT_USER);
export const loginUser = (walletAddress: string) =>
  action(LOGIN_USER, walletAddress);

export const updateCurrentUser = (user: UserType | null) =>
  action(UPDATE_CURRENT_USER, user);

export const actions = {
  requestCurrentUser,
  updateCurrentUser,
  loginUser,
};

// reducer
export type User = Readonly<{
  currentUser: UserType | null;
  isInitializing: boolean;
}>;

const initialState: User = {
  currentUser: null,
  isInitializing: true,
};

const currentUser = createReducer(initialState.currentUser).handleType(
  UPDATE_CURRENT_USER,
  (state, action) => action.payload
);

const isInitializing = createReducer(initialState.isInitializing).handleType(
  UPDATE_CURRENT_USER,
  () => false
);

export const reducer = combineReducers({
  currentUser,
  isInitializing,
});
