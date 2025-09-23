export type SelectProps = {
  title: string;
  options: { title: string; value: string }[];
  containerStyle?: object;
  error?: boolean;
  errorText?: string;
  defaultOptionTitle?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
