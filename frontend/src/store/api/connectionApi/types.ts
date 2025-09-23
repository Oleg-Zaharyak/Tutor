import { Account } from "../accountApi/types";
import { UserProfile } from "../profileApi/types";

export interface StudentTeacher {
  id: string;
  studentId: string;
  teacherId: string;
  student: Account;
  teacher: Account;
  createdAt: string;
}

export interface ConnectedAccount {
  connection: StudentTeacher;
  account: Account;
  profile: UserProfile;
}
