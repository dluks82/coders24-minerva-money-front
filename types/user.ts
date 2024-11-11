export interface Account {
  id: string;
  name: string;
  currentBalance: number;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    accounts: Account[];
  }