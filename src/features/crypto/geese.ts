import { action, createReducer } from "typesafe-actions";

import {
  Transaction,
  AddressResponse,
  CreateTransactionType,
} from "../../types/models";
import { combineReducers } from "redux";

export const GET_TRANSACTIONS = "cryto/GET_TRANSACTIONS";
export const GET_TRANSACTIONS_FOR_ADDRESS =
  "cryto/GET_TRANSACTIONS_FOR_ADDRESS";
export const UPDATE_TRANSACTIONS = "cryto/UPDATE_TRANSACTIONS";
export const UPDATE_TRANSACTIONS_FOR_USER =
  "cryto/UPDATE_TRANSACTIONS_FOR_USER";
export const CREATE_TRANSACTION = "cryto/CREATE_TRANSACTION";

// actions
export const getTransactions = () => action(GET_TRANSACTIONS);
export const getTransactionsForAddress = (walletAddress: string) =>
  action(GET_TRANSACTIONS_FOR_ADDRESS, walletAddress);

export const updateTransactions = (transactions: Transaction[]) =>
  action(UPDATE_TRANSACTIONS, transactions);

export const updateTransactionsForUser = (addressResponse: AddressResponse) =>
  action(UPDATE_TRANSACTIONS_FOR_USER, addressResponse);

export const createTransaction = (transactionPayload: CreateTransactionType) =>
  action(CREATE_TRANSACTION, transactionPayload);

export const actions = {
  getTransactions,
  updateTransactions,
  getTransactionsForAddress,
  updateTransactionsForUser,
  createTransaction,
};

// reducer
export type Crypto = Readonly<{
  transactions: Transaction[];
  currentUser: {
    transactions: Transaction[];
    balance: string | null;
  };
}>;

const initialState: Crypto = {
  transactions: [],
  currentUser: {
    transactions: [],
    balance: null,
  },
};

const currentUser = createReducer(initialState.transactions).handleType(
  UPDATE_TRANSACTIONS,
  (state, action) => action.payload
);

const transactions = createReducer(initialState.currentUser).handleType(
  UPDATE_TRANSACTIONS_FOR_USER,
  (state, action) => action.payload
);

export const reducer = combineReducers({
  currentUser,
  transactions,
});
