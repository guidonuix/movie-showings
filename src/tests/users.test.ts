import { describe, expect, test } from "vitest";
import { validateEmail, validatePanNumbers, validatePasswordLength } from "../utilites/registerHelper";

describe("users test", () => {
  test("validate credit card pan", () => {
    // Arrange
    const validPan = 1234123412341234;
    const invalidPan = 1234;

    // Act & Assert
    expect(validatePanNumbers(invalidPan)).toBe(false);
    expect(validatePanNumbers(validPan)).toBe(true);
  });

  test("validate email", () => {
    // Arrange
    const validEmail = "test@example.com";
    const invalidEmail = "test@example";

    // Act
    const result = validateEmail(validEmail);

    // Assert
    expect(result).toBe(true);
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  test("validate password at least 5 characters", ()=>{
    // Arrange
    const shortPassword = "1234";

   //Act
   const result = validatePasswordLength(shortPassword);
   
   // Assert
   expect(result).toBe(false);
  })
});
