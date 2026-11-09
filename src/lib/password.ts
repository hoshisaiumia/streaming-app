import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(raw: string): Promise<string> {
  const salt = bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hash(raw, salt);
}

export async function validatePassword(hashed: string, dbPass: string): Promise<boolean> {
  return await bcrypt.compare(hashed, dbPass);
}
