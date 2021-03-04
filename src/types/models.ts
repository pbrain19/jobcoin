export interface UserType {
  walletAddress: string;
}

export interface Transaction {
  amount: string;
  fromAddress?: string;
  timestamp: string;
  toAddress: string;
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
