import { AppBar, Toolbar, Button } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { logout } from "../services/auth-service";

export function Nav() {
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path;

    return (
        <AppBar position="static">
            <Toolbar sx={{ gap: 1 }}>
                <div className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Broadcast" style={{ width: 32, height: 32 }} />
                    <span className="text-xl">Broadcast</span>
                </div>
                <div className="flex ml-auto gap-6" >
                    <Button component={RouterLink} to="/dashboard/conexoes" variant={isActive("/dashboard/conexoes") ? "contained" : "text"} color="primary" sx={{ color: "text.secondary" }}>
                        Conexões
                    </Button>

                    <Button component={RouterLink} to="/dashboard/contatos" variant={isActive("/dashboard/contatos") ? "contained" : "text"} color="primary" sx={{ color: "text.secondary" }}>
                        Contatos
                    </Button>

                    <Button component={RouterLink} to="/dashboard/mensagens" variant={isActive("/dashboard/mensagens") ? "contained" : "text"} color="primary" sx={{ color: "text.secondary" }}>
                        Mensagens
                    </Button>

                    <Button variant="text" sx={{ ml: "auto", color: "text.secondary" }} onClick={logout}>
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}