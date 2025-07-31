export type ClerkErrorDetail = {
  message: string;
  code: string;
  meta: {
    paramName: string;
  };
};

export interface ClerkSignInError {
  errors?: ClerkErrorDetail[];
}
