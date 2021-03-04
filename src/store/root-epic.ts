import { combineEpics } from "redux-observable";

import * as userEpics from "../features/user/epics";
import * as cryptoEpics from "../features/crypto/epics";

export default combineEpics(
  ...Object.values(userEpics),
  ...Object.values(cryptoEpics)
);
