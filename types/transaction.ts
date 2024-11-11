export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
  }
  
  export interface Transaction {
    id: string;          // UUID
    amount: number;      // BigDecimal -> number
    type: TransactionType;
    category: number;    // Long -> number
    description: string;
    date: string;        // LocalDate -> string (YYYY-MM-DD)
    deleted: boolean;
  }