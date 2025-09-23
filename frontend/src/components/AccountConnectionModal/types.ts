export type AccountConnectionModalProps = {
  title: string;
  btnTitle: string;
  onClose: () => void;
  onConfirm: (email: string) => void;
};
