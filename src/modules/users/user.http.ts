import { ZodError } from "zod";
import { EmailAlreadyInUseError, UserNotFoundError } from "./user.errors";

export function handleUserError(e: unknown) {
  if (e instanceof ZodError) {
    return Response.json(
      { error: "Invalid data", details: e.issues },
      { status: 400 },
    );
  }
  if (e instanceof EmailAlreadyInUseError) {
    return Response.json({ error: e.message }, { status: 409 });
  }
  if (e instanceof UserNotFoundError) {
    return Response.json({ error: e.message }, { status: 404 });
  }
  console.error(e);
  return Response.json({ error: "Internal server error" }, { status: 500 });
}
