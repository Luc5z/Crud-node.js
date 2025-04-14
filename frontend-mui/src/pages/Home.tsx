import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import UserTable from '../components/UserTable';
import EditUserModal from '../components/EditUserModal';
import api from '../services/api';
import { User } from '../types/User';
import UserForm from '../components/UserForm';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleSubmit = async (user: User) => {
    if (editingUser) {
      await api.put(`/users/${editingUser.id}`, user);
    } else {
      await api.post('/users', user);
    }
    setEditingUser(null);
    setIsEditModalOpen(false);
    loadUsers();
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <UserForm onSubmit={handleSubmit} defaultValues={editingUser || undefined} />


      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <EditUserModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={editingUser}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
