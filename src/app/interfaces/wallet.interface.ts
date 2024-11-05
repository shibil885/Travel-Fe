import { TransactionType } from '../enum/transactionType.enum';
export interface ITransaction {
  amount: number;
  description: string;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWallet {
  userId: string;
  balance: number;
  history: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
}
