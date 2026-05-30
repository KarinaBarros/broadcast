import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  subscribeMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../../services/message-service";
import { subscribeConnections } from "../../services/connection-service";
import { subscribeContacts } from "../../services/contact-service";

function Mensagens() {
  const [messages, setMessages] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [availableContacts, setAvailableContacts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [selectedConnectionId, setSelectedConnectionId] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<"all" | "sent" | "scheduled">("all");

  useEffect(() => {
    const unsub = subscribeMessages(setMessages);
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeConnections(setConnections);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedConnectionId) {
      setAvailableContacts([]);
      setSelectedContacts([]);
      return;
    }

    const unsub = subscribeContacts((all: any[]) => {
      setAvailableContacts(
        all.filter((c) => c.connectionId === selectedConnectionId)
      );
    });

    return () => unsub();
  }, [selectedConnectionId]);

  const resetForm = () => {
    setOpen(false);
    setText("");
    setSelectedConnectionId("");
    setSelectedContacts([]);
    setScheduledDate("");
    setScheduledTime("");
  };

  const openEdit = (msg: any) => {
    setEditId(msg.id);
    setEditText(msg.text);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateMessage(editId, { text: editText });

    setEditOpen(false);
    setEditId(null);
    setEditText("");
  };

  const canSchedule = scheduledDate && scheduledTime;

  const filteredMessages = messages.filter((m) => {
    if (filter === "all") return true;
    return m.status === filter;
  });

  return (
    <div className="flex flex-col gap-4 p-4">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Mensagens</h1>
          <span className="text-gray-500">
            Gerencie suas mensagens
          </span>
        </div>

        <Button variant="contained" onClick={() => setOpen(true)}>
          + Nova Mensagem
        </Button>
      </div>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>

        <Button
          variant={filter === "sent" ? "contained" : "outlined"}
          onClick={() => setFilter("sent")}
        >
          Enviadas
        </Button>

        <Button
          variant={filter === "scheduled" ? "contained" : "outlined"}
          onClick={() => setFilter("scheduled")}
        >
          Agendadas
        </Button>
      </Box>

      <Box className="flex flex-col gap-2">

        {filteredMessages.map((m) => (
          <Card key={m.id}>
            <CardContent>

              <Typography>{m.text}</Typography>

              <Typography variant="caption" sx={{ display: "block" }}>
                Status:{" "}
                <b style={{
                  color:
                    m.status === "sent"
                      ? "green"
                      : m.status === "scheduled"
                      ? "orange"
                      : "gray",
                }}>
                  {m.status === "sent"
                    ? "Enviada"
                    : "Agendada"}
                </b>
              </Typography>

              {m.scheduledAt && (
                <Typography variant="caption" sx={{ display: "block" }}>
                  Agendado para:{" "}
                  {m.scheduledAt?.toDate
                    ? m.scheduledAt.toDate().toLocaleString("pt-BR")
                    : new Date(m.scheduledAt).toLocaleString("pt-BR")}
                </Typography>
              )}

              <Typography variant="caption" sx={{ display: "block" }}>
                Contatos: {m.contactIds?.length || 0}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <IconButton onClick={() => openEdit(m)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteMessage(m.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

            </CardContent>
          </Card>
        ))}

      </Box>

      <Dialog open={open} onClose={resetForm} fullWidth>
        <DialogTitle>Nova Mensagem</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Texto"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mt: 1 }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Conexão</InputLabel>
            <Select
              value={selectedConnectionId}
              onChange={(e) => {
                setSelectedConnectionId(e.target.value);
                setSelectedContacts([]);
              }}
            >
              {connections.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Contatos</InputLabel>
            <Select
              multiple
              value={selectedContacts}
              onChange={(e) =>
                setSelectedContacts(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
            >
              {availableContacts.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              fullWidth
            />

            <TextField
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              fullWidth
            />
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={resetForm}>Cancelar</Button>

          <Button
            variant="contained"
            onClick={async () => {
              await createMessage({
                text,
                connectionId: selectedConnectionId,
                contactIds: selectedContacts,
                scheduledAt: null,
                status: "sent",
              });

              resetForm();
            }}
          >
            Enviar
          </Button>

          <Button
            variant="outlined"
            disabled={!canSchedule}
            onClick={async () => {
              await createMessage({
                text,
                connectionId: selectedConnectionId,
                contactIds: selectedContacts,
                scheduledAt: new Date(`${scheduledDate}T${scheduledTime}`),
                status: "scheduled",
              });

              resetForm();
            }}
          >
            Agendar
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Mensagem</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Mensagens;