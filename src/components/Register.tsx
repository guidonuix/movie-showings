import { useMutation } from "@tanstack/react-query";
import type { UserType } from "../types/types";
import { useState } from "react";
import "./Register.css";
interface RegisterProps extends UserType {
  confirmPassword: string;
}

const Register = () => {
  const [newUser, setNewUser] = useState<RegisterProps>({
    id: 0,
    username: "",
    password: "",
    first: "",
    last: "",
    phone: "",
    email: "",
    imageUrl: "",
    creditCard: { pan: "", expiryMonth: 0, expiryYear: 0 },
    adminUser: false,
    isServer: false,
    confirmPassword: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (newUser: UserType) => {
      return fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newUser);
    mutate(newUser);
  };

  return (
    <>
      {isPending && <div>Registering...</div>}
      {error && <div>Error registering user</div>}
      <div className="container">
        <div className="header">Register</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <input
            type="text"
            name="first"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="last"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            name="pan"
            placeholder="Credit Card Number"
            onChange={handleChange}
          />
          <input
            type="number"
            name="expiryMonth"
            placeholder="Expiry Month"
            onChange={handleChange}
          />
          <input
            type="number"
            name="expiryYear"
            placeholder="Expiry Year"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
