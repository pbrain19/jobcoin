import { combineEpics } from "redux-observable";

import * as userEpics from "../features/user/epics";

export default combineEpics(...Object.values(userEpics));
