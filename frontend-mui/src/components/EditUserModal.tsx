import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { User } from '../types/User';

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSubmit: (user: User) => void;
};

export default function EditUserModal({ open, onClose, user, onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<User>();

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const handleFormSubmit = (data: User) => {
    onSubmit(data);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400
      }}>
        <Typography variant="h6" mb={2}>Editar Usuário</Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            fullWidth label="Nome" {...register('name')}
            margin="normal"
          />
          <TextField
            fullWidth label="Email" {...register('email')}
            margin="normal"
          />
          <TextField
            fullWidth type="number" label="Idade"
            {...register('age', { valueAsNumber: true })}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Salvar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
