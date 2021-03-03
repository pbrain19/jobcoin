import { actions as userActions } from "../features/user/geese";
import { actions as alertActions } from "../features/snackbar/geese";
import { actions as cryptoActions } from "../features/crypto/geese";

const rootActions = {
  user: userActions,
  alert: alertActions,
  crypt: cryptoActions,
};

export default rootActions;
