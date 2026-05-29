import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { register } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained">
        Criar conta
      </Button>
    </Box>
  );
}
