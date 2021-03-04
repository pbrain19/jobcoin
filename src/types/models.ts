export interface UserType {
  walletAddress: string;
}

export interface Transaction {
  to: string;
  from: string;
  amount: string;
}

export interface AddressResponse {
  balance: string;
  transactions: Transaction[];
}

export interface CreateTransactionType {
  toAddress: string;
  fromAddress: string;
  amount: string;
}
