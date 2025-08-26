export type Account = {
  id: string;
  profileId: string;
  type: AccountType;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
  title: string;
};

export enum AccountType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
  CLOSED = "CLOSED",
}
