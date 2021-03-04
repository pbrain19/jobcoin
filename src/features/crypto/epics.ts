import { RootAction, RootState, Services } from "JobcoinTypes";
import { Epic } from "redux-observable";
import { of, concat, from } from "rxjs";
import { catchError, filter, mergeMap } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  clearAlert,
  openLoader,
  openError,
  openCreated,
} from "../snackbar/geese";

import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_FOR_ADDRESS,
  CREATE_TRANSACTION,
  updateTransactions,
  updateTransactionsForUser,
  getTransactionsForAddress,
} from "./geese";

export const getUserTransactionsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { cryptoService }) =>
  action$.pipe(
    filter(isOfType(GET_TRANSACTIONS_FOR_ADDRESS)),
    mergeMap((action) => {
      return concat(
        of(openLoader("Loading user transactions")),
        from(cryptoService.getTransactionsForAddress(action.payload)).pipe(
          mergeMap((response) => [
            clearAlert(),
            updateTransactionsForUser(response.data),
          ]),
          catchError(() => [
            clearAlert(),
            updateTransactionsForUser({ transactions: [], balance: "" }),
          ])
        )
      );
    })
  );

export const getAllTransactionsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { cryptoService }) =>
  action$.pipe(
    filter(isOfType(GET_TRANSACTIONS)),
    mergeMap(() => {
      return concat(
        of(openLoader("Loading all transactions")),
        from(cryptoService.getAllTransactions()).pipe(
          mergeMap((response) => [
            clearAlert(),
            updateTransactions(response.data),
          ]),
          catchError(() => [clearAlert(), updateTransactions([])])
        )
      );
    })
  );

export const createTransactionEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { cryptoService }) =>
  action$.pipe(
    filter(isOfType(CREATE_TRANSACTION)),
    mergeMap((action) => {
      return concat(
        of(openLoader("Creating transaction")),
        from(cryptoService.createTransaction(action.payload)).pipe(
          mergeMap((response) => [
            openCreated("Transaction created"),
            getTransactionsForAddress(action.payload.fromAddress),
          ]),
          catchError((err) => [openError(err)])
        )
      );
    })
  );
