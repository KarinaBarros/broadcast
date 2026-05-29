import { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { logout } from "../services/auth-service";

export function Nav() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const menu = (
        <div className="flex flex-col gap-2 p-4">
            <Button component={RouterLink} to="/dashboard/conexoes"
                variant={isActive("/dashboard/conexoes") ? "contained" : "text"}
                color="primary" sx={{ color: "text.secondary" }} onClick={() => setOpen(false)}>
                Conexões
            </Button>

            <Button component={RouterLink} to="/dashboard/contatos"
                variant={isActive("/dashboard/contatos") ? "contained" : "text"}
                color="primary" sx={{ color: "text.secondary" }} onClick={() => setOpen(false)}>
                Contatos
            </Button>

            <Button component={RouterLink} to="/dashboard/mensagens"
                variant={isActive("/dashboard/mensagens") ? "contained" : "text"}
                color="primary" sx={{ color: "text.secondary" }} onClick={() => setOpen(false)}>
                Mensagens
            </Button>

            <Button variant="text" sx={{ color: "text.secondary" }}
                onClick={() => { setOpen(false); logout(); }}>
                Logout
            </Button>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Broadcast" style={{ width: 32, height: 32 }} />
                    <span className="text-xl">Broadcast</span>
                </div>

                <div className="hidden md:flex ml-auto gap-6">
                    <Button component={RouterLink} to="/dashboard/conexoes"
                        variant={isActive("/dashboard/conexoes") ? "contained" : "text"}
                        color="primary" sx={{ color: "text.secondary" }}>
                        Conexões
                    </Button>

                    <Button component={RouterLink} to="/dashboard/contatos"
                        variant={isActive("/dashboard/contatos") ? "contained" : "text"}
                        color="primary" sx={{ color: "text.secondary" }}>
                        Contatos
                    </Button>

                    <Button component={RouterLink} to="/dashboard/mensagens"
                        variant={isActive("/dashboard/mensagens") ? "contained" : "text"}
                        color="primary" sx={{ color: "text.secondary" }}>
                        Mensagens
                    </Button>

                    <Button variant="text" sx={{ ml: "auto", color: "text.secondary" }} onClick={logout}>
                        Logout
                    </Button>
                </div>

                <div className="flex md:hidden">
                    <IconButton color="inherit" sx={{ fontSize: 50 }} onClick={() => setOpen(true)}>
                        <MenuIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </div>
                <Drawer open={open} onClose={() => setOpen(false)}>{menu}</Drawer>
            </Toolbar>
        </AppBar>
    );
}