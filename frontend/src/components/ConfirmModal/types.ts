export type ConfirmModalProps = {
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  containerSize?: "medium" | "small" | "big"
  title?: string;
  showTwoButton?: boolean;
  className?: string;
};
