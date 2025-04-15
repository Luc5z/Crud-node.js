import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { User } from "../types/User";
import api from "../services/api";
import { EditUserModal } from "../components/EditUserModal";

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
    <><div style={{ maxWidth: 1200, margin: "auto", padding: 24 }}>
      <Title>Tabela de usuários </Title>

      <Card style={{ marginBottom: 24 }}>
        <UserForm onFinish={handleCreate} />
      </Card>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <EditUserModal
        visible={isModalVisible}
        user={editingUser}
        onClose={() => setIsModalVisible(false)}
        onSave={handleUpdate} />
    </div>
    <Typography.Text style={{ textAlign: "center", marginTop: 24, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
      Criado por: Luc5z
      <a href="https://github.com/Luc5z" target="_blank" rel="noopener noreferrer">
        <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub" style={{ width: 20, opacity: 0.8, verticalAlign: "middle" }} />
      </a>
      <a href="https://www.linkedin.com/in/dival-pontes-20a825271/" target="_blank" rel="noopener noreferrer">
        <img src="https://luc5z.github.io/images/icons/linkedin.png" alt="LinkedIn" style={{ width: 20, opacity: 0.8, verticalAlign: "middle" }} />
      </a>
      <a href="https://luc5z.github.io" target="_blank" rel="noopener noreferrer">
        <img src="https://i.postimg.cc/Z5dnLzkW/internet.png" alt="Portfolio" style={{ width: 20, opacity: 0.8, verticalAlign: "middle" }} />
      </a>
    </Typography.Text>
    <br />
    <br />
      </>

  );
};

export default Home;
