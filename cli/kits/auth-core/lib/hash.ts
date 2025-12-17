import { hash } from "bcryptjs";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return hash(password, saltRounds);
}
