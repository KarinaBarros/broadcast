import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  subscribeContacts,
  updateContact,
  createContact,
  deleteContact,
} from "../../services/contact-service";
import { subscribeConnections } from "../../services/connection-service";

function Contatos() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [connectionsMap, setConnectionsMap] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createPhone, setCreatePhone] = useState("");
  const [createConnectionId, setCreateConnectionId] = useState("");

  useEffect(() => {
    const unsub = subscribeContacts(setContacts);
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeConnections(setConnections);
    return () => unsub();
  }, []);

  useEffect(() => {
    const map: Record<string, string> = {};

    connections.forEach((c) => {
      map[c.id] = c.name;
    });

    setConnectionsMap(map);
  }, [connections]);

  const openEdit = (contact: any) => {
    setEditId(contact.id);
    setName(contact.name);
    setPhone(contact.phone);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateContact(editId, {
      name,
      phone,
    });

    setOpen(false);
    setEditId(null);
    setName("");
    setPhone("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Contatos</h1>
          <span className="text-gray-500">
            Gerencie seus contatos
          </span>
        </div>

        <Button
          variant="contained"
          onClick={() => setCreateOpen(true)}
        >
          + Novo Contato
        </Button>
      </div>

      <Box className="flex flex-col divide-y">

        {contacts.map((c) => (
          <Box
            key={c.id}
            className="flex items-center justify-between py-3"
          >

            <div className="flex flex-col">

              <span className="font-medium">
                {c.name}
              </span>

              <span className="text-sm text-gray-500">
                {c.phone}
              </span>

              <span className="text-xs text-blue-500">
                {connectionsMap[c.connectionId] || "Sem conexão"}
              </span>

            </div>

            <Box sx={{ display: "flex", gap: 1 }}>

              <IconButton onClick={() => openEdit(c)}>
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={async () => {
                  await deleteContact(c.id);
                }}
              >
                <DeleteIcon />
              </IconButton>

            </Box>

          </Box>
        ))}

      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Contato</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1 }}
          />

          <TextField
            fullWidth
            label="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mt: 2 }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={handleUpdate}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>Novo Contato</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Nome"
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            sx={{ mt: 1 }}
          />

          <TextField
            fullWidth
            label="Telefone"
            value={createPhone}
            onChange={(e) => setCreatePhone(e.target.value)}
            sx={{ mt: 2 }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Conexão</InputLabel>

            <Select
              value={createConnectionId}
              label="Conexão"
              onChange={(e) =>
                setCreateConnectionId(e.target.value)
              }
            >
              {connections.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={async () => {
              await createContact({
                name: createName,
                phone: createPhone,
                connectionId: createConnectionId,
              });

              setCreateName("");
              setCreatePhone("");
              setCreateConnectionId("");
              setCreateOpen(false);
            }}
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Contatos;