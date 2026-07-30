import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { AssignTaskModalProps } from "./types";
import { Icons } from "../../../../../../constants/icons";
import Button from "../../../../../../components/Button";

const users = [
  { id: "1", name: "John Doe", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com" },
  { id: "4", name: "Alice Williams", email: "alice.williams@example.com" },
  { id: "5", name: "Charlie Brown", email: "charlie.brown@example.com" },
  { id: "6", name: "David Wilson", email: "david.wilson@example.com" },
  { id: "7", name: "Emily Davis", email: "emily.davis@example.com" },
];

const AssignTaskModal: FC<AssignTaskModalProps> = ({ onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleAssign = () => {
    console.log(selectedUsers);

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Icons.cross onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>{"Users List"}</h1>

        <div className={styles.modal_users_list}>
          {users.map((user) => {
            const selected = selectedUsers.includes(user.id);

            return (
              <label
                key={user.id}
                className={`${styles.user} ${
                  selected ? styles.user_selected : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleUser(user.id)}
                />

                <div className={styles.user_info}>
                  <span className={styles.user_name}>{user.name}</span>
                  <span className={styles.user_email}>{user.email}</span>
                </div>
              </label>
            );
          })}
        </div>

        <Button
          medium
          title="Assign Task"
          onClick={handleAssign}
          disabled={!selectedUsers.length}
        />
      </div>
    </div>
  );
};
export default AssignTaskModal;
