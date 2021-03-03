import {
  Transaction,
  AddressResponse,
  CreateTransactionType,
} from "../types/models";
import baseService from "./base";

export const getTransactionsForAddress = async (address: string) =>
  baseService.get<AddressResponse>(`/addresses/${address}`);

export const getAllTransactions = async () =>
  baseService.get<Transaction[]>(`/transactions`);

export const createTransaction = async (payload: CreateTransactionType) => {
  return baseService.post(`/transactions`, payload);
};
