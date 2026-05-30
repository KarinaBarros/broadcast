import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  subscribeConnections,
  deleteConnection,
  updateConnection,
  createConnection,
} from "../../services/connection-service";

function Conexoes() {
  const [connections, setConnections] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeConnections(setConnections);
    return () => unsub();
  }, []);

  const openCreate = () => {
    setMode("create");
    setName("");
    setEditId(null);
    setOpen(true);
  };

  const openEdit = (id: string, currentName: string) => {
    setMode("edit");
    setEditId(id);
    setName(currentName);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (mode === "create") {
      await createConnection(name);
    }

    if (mode === "edit" && editId) {
      await updateConnection(editId, name);
    }

    setOpen(false);
    setName("");
    setEditId(null);
  };

  return (
    <div className="flex flex-col gap-4 p-4">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conexões</h1>

        <Button variant="contained" onClick={openCreate}>
          + Nova Conexão
        </Button>
      </div>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {connections.map((conn) => (
          <Card key={conn.id} sx={{ width: 280 }}>
            <CardContent>

              <Typography variant="h6">
                {conn.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() => openEdit(conn.id, conn.name)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteConnection(conn.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {mode === "create"
            ? "Nova Conexão"
            : "Editar Conexão"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {mode === "create" ? "Criar" : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Conexoes;