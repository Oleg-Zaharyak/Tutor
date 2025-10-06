import { FC } from "react";
import styles from "./styles.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import Button from "../../../../../components/Button";

type StudentCardProps = {
  fullName: string;
  email: string;
};

const StudentCard: FC<StudentCardProps> = ({ fullName, email }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <HiOutlineUserCircle className={styles.info_img} />
        <div className={styles.info_fullName}>{fullName}</div>
        <div className={styles.info_email}>{email}</div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          styleType="outline"
          size="medium"
          title="Message"
        />
        <Button
          className={styles.button}
          styleType="outline"
          size="medium"
          title="More info"
        />
      </div>
    </div>
  );
};

export default StudentCard;
