import React from "react";
import styles from "./styles.module.scss";
import { TableSkeleton } from "./skeleton";
import { useTranslation } from "react-i18next";

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  data?: T[];
  columns: Column<T>[];
  isLoading?: boolean;
};

export const Table = <T,>({ data, columns, isLoading }: TableProps<T>) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.table_head}>
          <tr className={styles.table_head_row}>
            {columns.map((col) => (
              <th key={col.key} className={styles.table_head_row_item}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <TableSkeleton columns={columns.length} rows={5} />
        ) : (
          <tbody className={styles.table_body}>
            {data?.length ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className={styles.table_body_row}>
                  {columns.map((col) => {
                    const value =
                      typeof item === "object" && item !== null
                        ? (item as Record<string, unknown>)[col.key]
                        : undefined;
                    return (
                      <td key={col.key} className={styles.table_body_row_item}>
                        {col.render
                          ? col.render(item)
                          : value !== undefined && value !== null
                          ? String(value)
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className={styles.table_body_row_item}
                  colSpan={columns.length}
                  style={{ textAlign: "center" }}
                >
                  {t("no-data")}
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};
