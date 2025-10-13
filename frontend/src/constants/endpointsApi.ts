export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const urls = {
  profile: `${API_BASE_URL}/api/profiles`,
  account: `${API_BASE_URL}/api/accounts`,
  connection: `${API_BASE_URL}/api/connections`,
  uploads: `${API_BASE_URL}/api/uploads`,
};
