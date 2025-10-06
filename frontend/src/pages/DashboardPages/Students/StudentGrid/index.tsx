import { FC } from "react";
import { ConnectedAccount } from "../../../../store/api/connectionApi/types";
import styles from "./styles.module.scss";
import StudentCard from "./StudentCard";
import { StudentCardSkeleton } from "./StudentCard/skeleton";

type StudentGridProps = {
  studentList?: ConnectedAccount[];
  isLoading?: boolean;
};

export const StudentGrid: FC<StudentGridProps> = ({
  studentList,
  isLoading,
}) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <StudentCardSkeleton />
      ) : (
        studentList &&
        studentList.map((item) => (
          <StudentCard
            key={item.connection.student.id}
            fullName={item.connection.student.profile.fullName}
            email={item.connection.student.profile.email}
          />
        ))
      )}
    </div>
  );
};
