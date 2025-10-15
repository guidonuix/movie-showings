import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
const queryClient = new QueryClient();

const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header>
          <nav className="nav">
            <div onClick={() => navigate({ to: "/" })}>Dinner and a movie</div>
            <div className="login">
              <div>Login</div>
              <Link className="register" to="/register">
                Register
              </Link>
            </div>
          </nav>
        </header>
        <Outlet />
        <footer>Copyright ©2025</footer>
      </QueryClientProvider>
    </>
  );
};
export const Route = createRootRoute({ component: RootLayout });
