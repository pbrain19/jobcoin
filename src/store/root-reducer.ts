import { combineReducers } from "redux";
import { reducer as userReducer } from "../features/user/geese";
import { reducer as cryptoReducer } from "../features/crypto/geese";
import { reducer as snackbarReducer } from "../features/snackbar/geese";

const rootReducer = () =>
  combineReducers({
    user: userReducer,
    crypto: cryptoReducer,
    snackbar: snackbarReducer,
  });

export default rootReducer;
