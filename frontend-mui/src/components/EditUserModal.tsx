import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user || { name: '', email: '', age: 0 },
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const handleSave = (data: User) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400,
      }}>
        <Typography variant="h6" mb={2}>Editar Usuário</Typography>
        <form onSubmit={handleSubmit(handleSave)}>
          <Stack spacing={2}>
            <TextField
              fullWidth label="Nome" {...register('name', { required: 'Nome obrigatório' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth label="Email" {...register('email', { required: 'Email obrigatório' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth type="number" label="Idade"
              {...register('age', {
                required: 'Idade obrigatória',
                valueAsNumber: true,
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
              <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
              <Button variant="contained" type="submit">Salvar</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
