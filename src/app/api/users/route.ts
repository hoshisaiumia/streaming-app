import { makeUserService } from "@/modules/users/user.factory";
import { handleUserError } from "@/modules/users/user.http";
import { createUserSchema } from "@/modules/users/user.schema";

export async function GET() {
  try {
    return Response.json(await makeUserService().list());
  } catch (e) {
    return handleUserError(e);
  }
}

export async function POST(req: Request) {
  try {
    const input = createUserSchema.parse(await req.json());
    const user = await makeUserService().register(input);
    return Response.json(user, { status: 201 });
  } catch (e) {
    return handleUserError(e);
  }
}
