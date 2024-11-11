import { Transaction } from "./transaction";

export interface Summary {
    income: number;
    expenses: number;
    balance: number;
  }
  
  export interface Dashboard {
    summary: Summary;
    recentTransactions: Transaction[];
  }