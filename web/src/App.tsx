import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { Layout } from "./layouts/layout";
import Conexoes from "./pages/Conexoes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contatos from "./pages/Contatos";
import Mensagens from "./pages/Mensagens";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="conexoes" replace />} />

            <Route path="conexoes" element={<Conexoes/>} />
            <Route path="contatos" element={<Contatos/>} />
            <Route path="mensagens" element={<Mensagens/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;