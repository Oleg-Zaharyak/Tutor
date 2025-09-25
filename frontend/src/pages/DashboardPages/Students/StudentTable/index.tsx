import { Table } from "../../../../components/Table";
import { ConnectedAccount } from "../../../../store/api/connectionApi/types";
// import styles from "./styles.module.scss";

export const StudentTable = ({
  studentList,
  isLoading,
}: {
  studentList?: ConnectedAccount[];
  isLoading?: boolean;
}) => {
  console.log(studentList);

  const studentColumns = [
    {
      key: "firstName",
      label: "Name",
      render: (item: ConnectedAccount) =>
        item.connection.student.profile?.firstName ?? "-",
    },
    {
      key: "lastName",
      label: "Last Name",
      render: (item: ConnectedAccount) =>
        item.connection.student.profile?.lastName ?? "-",
    },
    {
      key: "phone",
      label: "Phone number",
      render: (item: ConnectedAccount) =>
        item.connection.student.profile?.phoneNumber ?? "-",
    },
    {
      key: "email",
      label: "Email",
      render: (item: ConnectedAccount) =>
        item.connection.student.profile?.email ?? "-",
    },
    {
      key: "createdAt",
      label: "Student Added",
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
    <Table data={studentList} columns={studentColumns} isLoading={isLoading} />
  );
};
