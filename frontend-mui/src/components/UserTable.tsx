import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  TextField,
  Paper,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { User } from "../types/User";
import ViewUserModal from "./ViewUserModal";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TextField
        label="Buscar por nome ou email"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Id</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Idade</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  transition: "background-color 0.3s",
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell> {user.id} </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton color="success" onClick={() => setSelectedUser(user)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => onEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(user.id!)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <ViewUserModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />

    </>
  );
}
