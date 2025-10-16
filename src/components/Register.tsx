import { useMutation } from "@tanstack/react-query";
import type { UserType } from "../types/types";
import { useState } from "react";
import "./Register.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { validatePanNumbers } from "../utilites/registerHelper";
import { z } from "zod";

// Zod schema for validation
const creditCardSchema = z.object({
  pan: z
    .string()
    .min(13, "Credit card number must be at least 13 digits")
    .max(19, "Credit card number must be at most 19 digits")
    .regex(/^\d+$/, "Credit card number must contain only digits"),
  expiryMonth: z
    .number()
    .min(1, "Month must be between 1-12")
    .max(12, "Month must be between 1-12"),
  expiryYear: z
    .number()
    .min(
      new Date().getFullYear(),
      `Year must be ${new Date().getFullYear()} or later`
    ),
});

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    first: z.string().min(1, "First name is required"),
    last: z.string().min(1, "Last name is required"),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    imageUrl: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
    creditCard: creditCardSchema,
    adminUser: z.boolean(),
    isServer: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface RegisterProps extends Omit<UserType, "id"> {
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [newUser, setNewUser] = useState<RegisterProps>({
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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (newUser: UserType) => {
      return await fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/register`, {
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

    if (name.startsWith("creditCard.")) {
      const creditCardField = name.split(".")[1];

      if (creditCardField === "pan" && !validatePanNumbers(parseInt(value))) {
        return;
      }

      setNewUser((prev) => ({
        ...prev,
        creditCard: {
          ...prev.creditCard,
          [creditCardField]:
            creditCardField === "pan" ? value : parseInt(value) || 0,
        },
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous validation errors
    setValidationErrors({});

    try {
      // Validate the form data
      registerSchema.parse(newUser);

      // If validation passes, proceed with registration
      console.log(newUser);
      mutate(newUser);
      login(newUser.username, newUser.password);
      navigate({ to: "/" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          errors[path] = issue.message;
        });
        setValidationErrors(errors);
        console.log("Validation errors:", errors);
      }
    }
  };

  // Helper function to get error message for a field
  const getErrorMessage = (fieldName: string): string | undefined => {
    return validationErrors[fieldName];
  };

  return (
    <>
      {isPending && <div>Registering...</div>}
      {error && <div>Error registering user</div>}
      <div className="back-button" onClick={() => history.go(-1)}>
        &lt; Back
      </div>
      <div className="container">
        <div className="header">Register</div>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("username") ? "red" : "" }}
            />
            {getErrorMessage("username") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("username")}
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("password") ? "red" : "" }}
            />
            {getErrorMessage("password") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("password")}
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              style={{
                borderColor: getErrorMessage("confirmPassword") ? "red" : "",
              }}
            />
            {getErrorMessage("confirmPassword") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("confirmPassword")}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="first"
              placeholder="First Name"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("first") ? "red" : "" }}
            />
            {getErrorMessage("first") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("first")}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="last"
              placeholder="Last Name"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("last") ? "red" : "" }}
            />
            {getErrorMessage("last") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("last")}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("phone") ? "red" : "" }}
            />
            {getErrorMessage("phone") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("phone")}
              </div>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("email") ? "red" : "" }}
            />
            {getErrorMessage("email") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("email")}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              onChange={handleChange}
              style={{ borderColor: getErrorMessage("imageUrl") ? "red" : "" }}
            />
            {getErrorMessage("imageUrl") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("imageUrl")}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="creditCard.pan"
              placeholder="Credit Card Number"
              onChange={handleChange}
              style={{
                borderColor: getErrorMessage("creditCard.pan") ? "red" : "",
              }}
            />
            {getErrorMessage("creditCard.pan") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("creditCard.pan")}
              </div>
            )}
          </div>
          <div>
            <input
              type="number"
              name="creditCard.expiryMonth"
              placeholder="Expiry Month"
              onChange={handleChange}
              style={{
                borderColor: getErrorMessage("creditCard.expiryMonth")
                  ? "red"
                  : "",
              }}
            />
            {getErrorMessage("creditCard.expiryMonth") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("creditCard.expiryMonth")}
              </div>
            )}
          </div>
          <div>
            <input
              type="number"
              name="creditCard.expiryYear"
              placeholder="Expiry Year"
              onChange={handleChange}
              style={{
                borderColor: getErrorMessage("creditCard.expiryYear")
                  ? "red"
                  : "",
              }}
            />
            {getErrorMessage("creditCard.expiryYear") && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {getErrorMessage("creditCard.expiryYear")}
              </div>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
