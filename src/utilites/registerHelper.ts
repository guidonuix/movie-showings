import type { UserType } from "../types/types";

export const validatePanNumbers = (value: number) => {
  // Remove all non-digit characters
  const cleaned = ("" + value).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
  if (match) {
    return !!`${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return false;
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePasswordLength = (password: string) => {
    return password.length >= 5;
}
