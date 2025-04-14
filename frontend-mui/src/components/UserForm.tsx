import { Button, TextField, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../types/User';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(0, 'Age is required'),
});

type UserFormProps = {
  onSubmit: (data: User) => void;
  defaultValues?: User;
};

export default function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          error={!!errors.age}
          helperText={errors.age?.message}
        />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
