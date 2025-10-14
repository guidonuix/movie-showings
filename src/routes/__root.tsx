import { createRootRoute, Outlet } from "@tanstack/react-router";
const RootLayout = () => (
  <>
    {/* All your static JSX can go here */}
    <Outlet />
  </>
);
export const Route = createRootRoute({ component: RootLayout });
