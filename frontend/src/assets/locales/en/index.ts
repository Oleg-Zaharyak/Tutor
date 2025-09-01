import common from "./common.json";

// ----- auth pages -----
import { auth } from "./auth";

// ----- onboarding -----
import { onboarding } from "./onboarding";

export const en = {
  common,
  ...auth,
  ...onboarding,
};
