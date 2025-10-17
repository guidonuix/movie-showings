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
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header>
          <nav className="nav">
            <div className="logo" onClick={() => navigate({ to: "/" })}>
              Dinner and a movie
            </div>

            {isAuthenticated ? (
              <>
                <Link className="nav-item orders" to="/pick-orders">
                  Orders
                </Link>
                <Link className="nav-item areas" to="/pick-area">
                  Areas
                </Link>
                <div className="nav-item logout" onClick={() => logout()}>
                  Logout
                </div>
                <div className="nav-item">Hello, {user?.first}!</div>
              </>
            ) : (
              <>
                <Link className="nav-item login" to="/login">
                  Login
                </Link>
                <Link className="nav-item register" to="/register">
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
