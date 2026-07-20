export const getAuthToken = async () => {
  if (typeof window !== "undefined" && window.Clerk) {
    try {
      return await window.Clerk.session?.getToken();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};
