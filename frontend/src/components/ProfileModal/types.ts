import { UserProfile } from "../../store/api/profileApi/types";


export type ProfileModalProps = {
  profileData: UserProfile | undefined;
  handleCloseModal: () => void;
};