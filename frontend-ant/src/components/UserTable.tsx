import { Table, Button, Popconfirm } from "antd";
import { User } from "../types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  return (
    <Table dataSource={users} rowKey="id" pagination={false}>
      <Table.Column title="Name" dataIndex="name" />
      <Table.Column title="Email" dataIndex="email" />
      <Table.Column title="Age" dataIndex="age" />
      <Table.Column
        title="Actions"
        render={(_, record: User) => (
          <>
            <Button type="link" onClick={() => onEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => record.id !== undefined && onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      />
    </Table>
  );
};

export default UserTable;
