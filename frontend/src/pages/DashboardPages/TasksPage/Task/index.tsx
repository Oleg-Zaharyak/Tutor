import Button from "../../../../components/Button";
import { ButtonStyles } from "../../../../components/Button/types";
import styles from "./styles.module.scss";
import { Icons } from "../../../../constants/icons";

const Task = () => {
  return (
    <div className={styles.task_container}>
      <div className={styles.task_header}>
        <div className={styles.task_title}>Завдання 1 </div>
        <div className={styles.task_buttons}>
          <Button
            title="Edit"
            Icon={Icons.gear}
            showOnlyIcon
            small
            showTooltip
            buttonStyle={ButtonStyles.OUTLINE}
          />
          <Button
            title="Assign"
            Icon={Icons.addPerson}
            showOnlyIcon
            small
            showTooltip
            buttonStyle={ButtonStyles.OUTLINE}
          />
        </div>
      </div>
      <div className={styles.task_content}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto voluptas
        magnam eum consequatur, sequi recusandae perferendis consectetur
        nesciunt facilis hic et, ex unde dolorum aspernatur rem laboriosam
        perspiciatis ad doloremque?
      </div>
    </div>
  );
};

export default Task;
