import { FC, useCallback } from "react";
import styles from "./styles.module.scss";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { toggleMenu } from "../../store/slices/appUISlice";

export const TopBar: FC = () => {
  const dispatch = useAppDispatch();
  const { expandMenu } = useAppSelector((state) => state.appUI);
  const hangleClick = useCallback(() => dispatch(toggleMenu()), [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.colapsMenu}>
        <button onClick={hangleClick}>
          {expandMenu ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarLeftExpand />
          )}
        </button>
      </div>
    </div>
  );
};
