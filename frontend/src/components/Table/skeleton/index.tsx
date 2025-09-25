import React from "react";
import styles from "./styles.module.scss";

type TableSkeletonProps = {
  columns: number; // кількість колонок
  rows?: number; // кількість рядків, за замовчуванням 5
};

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 5,
}) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className={styles.skeleton}>
              <div className={styles.skeleton_block} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
