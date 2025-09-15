import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";

const ProfileSettings = () => {
  const { user } = useUser();

  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  console.log(profileData);

  return <div>Profile</div>;
};

export default ProfileSettings;
