import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";

export function Layout() {
  return (
    <>
      <Nav />

      <main>
        <Outlet />
      </main>
    </>
  );
}