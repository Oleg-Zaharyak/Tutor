import { useTranslation } from "react-i18next";
import { Table } from "../../../../components/Table";
import { ConnectedAccount } from "../../../../store/api/connectionApi/types";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { ButtonStyles } from "../../../../components/Button/types";

export const StudentTable = ({
  studentList,
  isLoading,
}: {
  studentList?: ConnectedAccount[];
  isLoading?: boolean;
}) => {
  const { t } = useTranslation("students");
  const navigate = useNavigate();

  const studentColumns = [
    {
      key: "firstName",
      label: t("table-label.firstName"),
      render: (item: ConnectedAccount) =>
        item.connection.student?.profile.firstName ?? "-",
    },
    {
      key: "lastName",
      label: t("table-label.lastName"),
      render: (item: ConnectedAccount) =>
        item.connection.student?.profile.lastName ?? "-",
    },
    {
      key: "phone",
      label: t("table-label.phoneNumber"),
      render: (item: ConnectedAccount) =>
        item.connection.student?.profile.phoneNumber ?? "-",
    },
    {
      key: "email",
      label: t("table-label.email"),
      render: (item: ConnectedAccount) =>
        item.connection.student?.profile.email ?? "-",
    },
    {
      key: "createdAt",
      label: t("table-label.added"),
      render: (item: ConnectedAccount) =>
        item.connection.createdAt
          ? new Date(item.connection.createdAt).toLocaleDateString()
          : "-",
    },
    {
      key: "action",
      label: "",
      render: (item: ConnectedAccount) => (
        <Button
          title={t("table-label.btn")}
          onClick={() => navigate(`/dashboard/students/${item.connection?.id}`)}
          buttonStyle={ButtonStyles.OUTLINE}
          small
        />
      ),
    },
  ];

  return (
    <Table data={studentList} columns={studentColumns} isLoading={isLoading} />
  );
};
