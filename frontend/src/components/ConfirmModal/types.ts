export type ConfirmModalProps = {
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
  showTwoButton?: boolean;
  className?: string;
};
