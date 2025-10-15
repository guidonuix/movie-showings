//import { useState } from "react";
//import { type UserType } from "../types/types";
import { useUserStore } from "../store/userStore";

/**
 * Custom hook to manage a boolean state with a toggle function.
 * @param {boolean} initialValue - The initial boolean value.
 * @returns {[boolean, () => void]} - An array containing the current boolean state and a toggle function.
 */
function useAuth() {
  const { user, setUser } = useUserStore();
  //const [user, setUser] = useState<UserType | null>(null);

  const login = async (username: string, password: string) => {
    if (!user) {
      await fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return { user, isAuthenticated, login, logout };
}

export default useAuth;
