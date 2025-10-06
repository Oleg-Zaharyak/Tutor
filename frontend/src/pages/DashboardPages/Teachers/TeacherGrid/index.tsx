import { FC } from "react";
import { ConnectedAccount } from "../../../../store/api/connectionApi/types";
import styles from "./styles.module.scss";
import TeacherCard from "./TeacherCard";
import { TeacherCardSkeleton } from "./TeacherCard/skeleton";

type TeacherGridProps = {
  teacherList?: ConnectedAccount[];
  isLoading?: boolean;
};

export const TeacherGrid: FC<TeacherGridProps> = ({
  teacherList,
  isLoading,
}) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <TeacherCardSkeleton />
      ) : (
        teacherList &&
        teacherList.map((item) => (
          <TeacherCard
            key={item.connection.teacher.id}
            fullName={item.connection.teacher.profile.fullName}
            email={item.connection.teacher.profile.email}
          />
        ))
      )}
    </div>
  );
};
