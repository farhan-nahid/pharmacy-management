import jsonWebToken from "jsonwebtoken";

import env from "@/env";

interface User {
  id: string;
  firstName?: string;
  email?: string;
  role?: string;
}

function generateToken(user: User) {
  const { id, firstName, email, role } = user;
  return jsonWebToken.sign({ id, firstName, email, role: role ?? null }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
}

export default generateToken;
