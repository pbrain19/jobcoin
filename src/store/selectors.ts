import { RootState } from "JobcoinTypes";

export const selectCurrentUser = ({ user }: RootState) => user.currentUser;
export const selectCurrentWallet = ({ crypto }: RootState) =>
  crypto.currentUser;
export const selectSnackbar = ({ snackbar }: RootState) => snackbar.snackbar;
