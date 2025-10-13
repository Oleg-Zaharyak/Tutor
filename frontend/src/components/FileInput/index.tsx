import { FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FileInputProps } from "./types";

const FileInput: FC<FileInputProps> = ({
  onChange,
  accept,
  styleType = "filled",
  className,
  ifFileSelected = false,
  title,
  fileLoadedTitle,
}) => {
  return (
    <label className={clsx(styles.label, styles[styleType], className)}>
      {ifFileSelected && fileLoadedTitle ? fileLoadedTitle : title}
      <input
        type="file"
        className={styles.hiddenInput}
        onChange={onChange}
        accept={accept}
      />
    </label>
  );
};

export default FileInput;
