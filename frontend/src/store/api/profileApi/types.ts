import { Account } from "../accountApi/types";

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  address: string;
  avatarUrl: string;
  bio: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  selectedAccountId: string;
  accounts: Account[];
}
