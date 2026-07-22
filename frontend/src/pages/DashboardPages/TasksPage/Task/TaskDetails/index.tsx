// import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import { ButtonStyles } from "../../../../../components/Button/types";
import { Icons } from "../../../../../constants/icons";
import styles from "./styles.module.scss";

const TaskDetails = () => {
  // const { taskId } = useParams<{ taskId: string }>();

  return (
    <div className={styles.task_container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.header_title}>Title</div>
          <div className={styles.header_description}>Description</div>
        </div>
        <div className={styles.left_bottom}>
          <div className={styles.questions}>
            <div className={styles.block}>
              <p>Some text</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <Button
            onClick={() => {}}
            title={"Add Question"}
            buttonStyle={ButtonStyles.OUTLINE}
            medium
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.task_buttons}>
          <Button
            title={"Edit"}
            Icon={Icons.gear}
            showOnlyIcon
            small
            showTooltip
            buttonStyle={ButtonStyles.OUTLINE}
            // onClick={() => handleOpenTaskDetails(id)}
          />
          <Button
            title={"Assign"}
            Icon={Icons.addPerson}
            showOnlyIcon
            small
            showTooltip
            buttonStyle={ButtonStyles.OUTLINE}
            // onClick={onAssign}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
