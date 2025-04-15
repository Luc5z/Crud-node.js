import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types/User";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  age: z.number().min(1, "Idade é obrigatória"),
});

type UserFormProps = {
  onSubmit: (data: User) => void;
  defaultValues?: User;
};

export default function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: User) => {
    onSubmit(data);
    if (!defaultValues) {
      reset({ name: "", email: "", age: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Idade"
          type="number"
          {...register("age", { valueAsNumber: true })}
          error={!!errors.age}
          helperText={errors.age?.message}
        />
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </Stack>
    </form>
  );
}
