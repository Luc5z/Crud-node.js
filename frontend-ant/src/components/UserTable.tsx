import { useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Space,
  Input,
  Card,
  ConfigProvider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { User } from "../types/User";
import ViewUserModal from "./ViewUserModal";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsViewModalVisible(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#52c41a",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Card bordered>
        <Input
          placeholder="Buscar por nome ou email"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ maxWidth: 300, marginBottom: 16 }}
        />

        <Table
          dataSource={filteredUsers}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;

              if (
                target.closest("button") ||
                target.closest(".ant-popover") ||
                target.closest(".ant-popconfirm")
              ) {
                return;
              }

              handleView(record);
            },
            style: { cursor: "pointer" },
          })}
        >
          <Table.Column title="ID" dataIndex="id" />
          <Table.Column title="Nome" dataIndex="name" />
          <Table.Column title="Email" dataIndex="email" />
          <Table.Column title="Idade" dataIndex="age" />
          <Table.Column
            title="Ações"
            key="actions"
            render={(_, record: User) => (
              <Space size="middle">
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(record);
                  }}
                  style={{ color: "#52c41a", borderColor: "#52c41a" }}
                >
                  Editar
                </Button>

                <Popconfirm
                  title="Tem certeza que deseja deletar?"
                  onConfirm={() => onDelete(record.id!)}
                  okText="Sim"
                  cancelText="Cancelar"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Deletar
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>

        <p style={{ marginTop: 16, textAlign: "center" }}>
          Clique em uma linha da tabela para visualizar os detalhes do usuário.
        </p>

        <ViewUserModal
          user={selectedUser}
          visible={isViewModalVisible}
          onClose={() => setIsViewModalVisible(false)}
        />
      </Card>
    </ConfigProvider>
  );
};

export default UserTable;
