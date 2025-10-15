import { useRef } from "react";
import "./Register.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

// interface RegisterProps extends Omit<UserType, "id"> {
//   confirmPassword: stri  ng;
// }

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
        <div className="header">Login</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
