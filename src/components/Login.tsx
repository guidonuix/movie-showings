import { useRef } from "react";
import "./Register.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import "./Form.css";

const Login = () => {
  const { login } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (username && password) {
      login(username, password).then(() => {
        navigate({ to: "/" });
      });
    }
  };

  return (
    <>
      <div className="back-button" onClick={() => history.go(-1)}>
        &lt; Back
      </div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="username">Username:</label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password:</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
