import { RootState } from "JobcoinTypes";

export const selectCurrentUser = ({ user }: RootState) => user.currentUser;
