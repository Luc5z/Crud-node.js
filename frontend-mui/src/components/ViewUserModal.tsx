import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
  } from "@mui/material";
  import { User } from "../types/User";
  
  type Props = {
    open: boolean;
    onClose: () => void;
    user: User | null;
  };
  
  export default function ViewUserModal({ open, onClose, user }: Props) {
    if (!user) return null;
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Visualizar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            value={user.name}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Email"
            value={user.email}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Idade"
            value={user.age}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    );
  }
  