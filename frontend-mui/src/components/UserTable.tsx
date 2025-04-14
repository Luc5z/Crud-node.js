import {
    Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Stack,
  } from '@mui/material';
  import { Delete } from '@mui/icons-material';
  import { User } from '../types/User';
  
  type Props = {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
  };
  
  export default function UserTable({ users, onEdit, onDelete }: Props) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(user)}
                  >
                    Editar
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(user.id!)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  