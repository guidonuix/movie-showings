import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";
const queryClient = new QueryClient();

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header>
          <nav className="nav">
            <div className="logo" onClick={() => navigate({ to: "/" })}>Dinner and a movie</div>

            {isAuthenticated ? (
              <div className="logout" onClick={() => logout()}>
                Logout
              </div>
            ) : (
              <>
                <Link className="login" to="/login">
                  Login
                </Link>
                <Link className="register" to="/register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>
        <Outlet />
        <footer>Copyright ©2025</footer>
      </QueryClientProvider>
    </>
  );
};
export const Route = createRootRoute({ component: RootLayout });
