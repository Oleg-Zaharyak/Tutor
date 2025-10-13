export type FileInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  styleType?: "filled" | "outline";
  className?: string;
  ifFileSelected?: boolean;
  title: string;
  fileLoadedTitle?: string;
};
