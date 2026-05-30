import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { register } from "../../services/auth-service";
import { useNavigate, Link } from "react-router-dom";

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 380, p: 2 }}>
        <CardContent>

          <Typography
            component="div"
            variant="h5"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Criar conta
          </Typography>

          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mb: 2,
            }}
          >
            Preencha os dados para se registrar
          </Typography>

          <Box component="form" onSubmit={handleRegister}>

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />

            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Criar conta
            </Button>

          </Box>

          <Typography
            component="div"
            sx={{
              mt: 2,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Já tem conta?{" "}
            <Link
              to="/login"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Entrar
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}
