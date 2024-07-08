// jwtUtils.ts

import jwt from "jsonwebtoken";
import { config } from "../config/env";

const secretKey = config.JWT_SECRET;
/**
 * Generates a JWT token.
 * @param payload - The payload to be encoded in the token.
 * @param expiresIn - The token expiration time.
 * @returns The generated JWT token.
 */
export function generateToken(
  payload: object,
  expiresIn: string | number
): string {
  return jwt.sign(payload, secretKey, { expiresIn });
}

/**
 * Verifies a JWT token.
 * @param token - The token to be verified.
 * @returns The decoded payload if the token is valid, otherwise throws an error.
 */
export function verifyToken(token: string): object | string {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid token");
  }
}
