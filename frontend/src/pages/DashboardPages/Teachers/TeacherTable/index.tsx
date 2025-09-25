import { Table } from "../../../../components/Table";
import { ConnectedAccount } from "../../../../store/api/connectionApi/types";
// import styles from "./styles.module.scss";

export const TeacherTable = ({
  teacherList,
  isLoading,
}: {
  teacherList?: ConnectedAccount[];
  isLoading?: boolean;
}) => {
  const studentColumns = [
    {
      key: "firstName",
      label: "Name",
      render: (item: ConnectedAccount) =>
        item.connection.teacher.profile?.firstName ?? "-",
    },
    {
      key: "lastName",
      label: "Last Name",
      render: (item: ConnectedAccount) =>
        item.connection.teacher.profile?.lastName ?? "-",
    },
    {
      key: "phone",
      label: "Phone number",
      render: (item: ConnectedAccount) =>
        item.connection.teacher.profile?.phoneNumber ?? "-",
    },
    {
      key: "email",
      label: "Email",
      render: (item: ConnectedAccount) =>
        item.connection.teacher.profile?.email ?? "-",
    },
    {
      key: "createdAt",
      label: "Teacher Added",
      render: (item: ConnectedAccount) =>
        item.connection.createdAt
          ? new Date(item.connection.createdAt).toLocaleDateString()
          : "-",
    },
    {
      key: "action",
      label: "Action",
      render: () => "More info",
    },
  ];

  return (
    <Table data={teacherList} columns={studentColumns} isLoading={isLoading} />
  );
};
