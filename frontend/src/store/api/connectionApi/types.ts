import { Account } from "../accountApi/types";
import { Profile } from "../profileApi/types";

export interface AccountWithProfile extends Account {
  profile: Profile;
}
export interface StudentTeacher {
  id: string;
  studentId: string;
  teacherId: string;
  student: AccountWithProfile;
  teacher: AccountWithProfile;
  createdAt: string;
}

export interface ConnectedAccount {
  connection: StudentTeacher;
}
