import { useEffect, useState } from "react";
import { Card, Typography, Button } from "antd";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { User } from "../types/User";
import api from "../services/api";
import { EditUserModal } from "../components/EditUserModal"; // novo componente

const { Title } = Typography;

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUsers = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };

  const handleCreate = async (values: Omit<User, "id">) => {
    await api.post("/users", values);
    fetchUsers();
  };

  const handleUpdate = async (updatedUser: User) => {
    await api.put(`/users/${updatedUser.id}`, updatedUser);
    setEditingUser(null);
    setIsModalVisible(false);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 24 }}>
      <Title>User Management</Title>

      <Card style={{ marginBottom: 24 }}>
        <UserForm onFinish={handleCreate} />
      </Card>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <EditUserModal
        visible={isModalVisible}
        user={editingUser}
        onClose={() => setIsModalVisible(false)}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default Home;
