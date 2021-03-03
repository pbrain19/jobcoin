import { combineReducers } from "redux";
import { reducer as userReducer } from "../features/user/geese";
import { reducer as cryptoReducer } from "../features/crypto/geese";

const rootReducer = () =>
  combineReducers({
    user: userReducer,
    crypto: cryptoReducer,
  });

export default rootReducer;
