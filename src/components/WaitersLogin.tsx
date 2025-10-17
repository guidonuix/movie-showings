import { useRef, useState } from "react";
import "./Register.css";
import "./WaitersLogin.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import "./Form.css";

const WaitersLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (username && password) {
      const user = await login(username, password);
      if (user && user.isServer) {
        navigate({ to: "/pick-area" });
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="error-container">
            {error && <span className="error">{error}</span>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default WaitersLogin;
