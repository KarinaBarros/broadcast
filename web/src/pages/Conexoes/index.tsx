import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createConnection } from "../../services/connection-service";

function Conexoes() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col items-center h-screen gap-4 p-4">
      <div className="flex w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Conexões</h1>
          <span className="text-gray-500">Gerencie suas conexões</span>
        </div>

        <div className="ml-auto my-auto">
          <Button variant="contained" onClick={() => setOpen(true)}>
            + Nova Conexão
          </Button>
        </div>
      </div>

       <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nova Conexão</DialogTitle>

        <DialogContent>
          <TextField
            placeholder="Nome da conexão"
            label="Nome"
            fullWidth
            sx={{ mt: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={async() => {await createConnection(name); setName("")}} color="primary">
            Criar
          </Button>
          <Button onClick={() => {setOpen(false); setName("")}} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
  
    </div>
  );
}

export default Conexoes;
