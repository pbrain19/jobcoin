import { RootAction, RootState, Services } from "JobcoinTypes";
import { Epic } from "redux-observable";
import { of, concat, from } from "rxjs";
import { catchError, filter, mergeMap } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { updateTransactionsForUser } from "../crypto/geese";
import { loginUser } from "../user/geese";
import { clearAlert, openLoader, openError } from "../snackbar/geese";

import {
  REQUEST_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  updateCurrentUser,
} from "./geese";

export const getUserEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { userService }
) =>
  action$.pipe(
    filter(isOfType(REQUEST_CURRENT_USER)),
    mergeMap(() => {
      const currentUser = userService.getCurrentUser();

      if (currentUser) {
        return of(loginUser(currentUser.walletAddress));
      } else {
        return of(updateCurrentUser(currentUser));
      }
    })
  );

export const loginUserEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { userService, cryptoService }) =>
  action$.pipe(
    filter(isOfType(LOGIN_USER)),
    mergeMap(({ payload }) =>
      concat(
        of(openLoader("Login in")),
        from(cryptoService.getTransactionsForAddress(payload)).pipe(
          mergeMap(({ data }) => {
            if (data.transactions.length) {
              const user = userService.loginUser(payload);
              return [
                clearAlert(),
                updateCurrentUser(user),
                updateTransactionsForUser(data),
              ];
            } else {
              return [openError("no user found")];
            }
          }),
          catchError(() => [
            clearAlert(),
            updateTransactionsForUser({ transactions: [], balance: "" }),
          ])
        )
      )
    )
  );

export const logoutUserEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { userService }) =>
  action$.pipe(
    filter(isOfType(LOGOUT_USER)),
    mergeMap(() => {
      userService.logoutUser();

      return [
        updateCurrentUser(null),
        updateTransactionsForUser({ transactions: [], balance: "" }),
      ];
    })
  );
