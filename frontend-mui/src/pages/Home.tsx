import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import UserTable from "../components/UserTable";
import EditUserModal from "../components/EditUserModal";
import api from "../services/api";
import { User } from "../types/User";
import UserForm from "../components/UserForm";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleCreate = async (user: User) => {
    await api.post("/users", user);
    loadUsers();
  };

  const handleEditSubmit = async (user: User) => {
    if (editingUser) {
      await api.put(`/users/${editingUser.id}`, user);
      setEditingUser(null);
      setIsEditModalOpen(false);
      loadUsers();
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <><Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tabela de Usuários
      </Typography>

      <UserForm onSubmit={handleCreate} />

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <EditUserModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={editingUser}
        onSubmit={handleEditSubmit} />
    </Container>
    <Typography variant="body2" align="center" sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      Criado por: Luc5z
      <a href="https://github.com/Luc5z" target="_blank" rel="noopener noreferrer">
        <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub" style={{ width: 20, opacity: 0.8, verticalAlign: 'middle' }} />
      </a>
      <a href="https://www.linkedin.com/in/dival-pontes-20a825271/" target="_blank" rel="noopener noreferrer">
        <img src="https://luc5z.github.io/images/icons/linkedin.png" alt="LinkedIn" style={{ width: 20, opacity: 0.8, verticalAlign: 'middle' }} />
      </a>
      <a href="https://luc5z.github.io" target="_blank" rel="noopener noreferrer">
        <img src="https://i.postimg.cc/Z5dnLzkW/internet.png" alt="Portfolio" style={{ width: 20, opacity: 0.8, verticalAlign: 'middle' }} />
      </a>
    </Typography>
      </>
  );
}
