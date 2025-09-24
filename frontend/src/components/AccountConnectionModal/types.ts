export type AccountConnectionModalProps = {
  accountType: "STUDENT" | "TEACHER";
  onClose: () => void;
  accountId: string;
};
