import { Profile } from "../../store/api/profileApi/types";


export type ProfileModalProps = {
  profileData: Profile | undefined;
  handleCloseModal: () => void;
};