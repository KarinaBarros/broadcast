import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { login } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth sx={{ mt: 1 }}
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ mt: 1 }}
      />

      <Button type="submit" variant="contained">
        Entrar
      </Button>
    </Box>
  );
}
