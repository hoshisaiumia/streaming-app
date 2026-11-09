import { makeUserService } from "@/modules/users/user.factory";
import { handleUserError } from "@/modules/users/user.http";
import { updateUserSchema } from "@/modules/users/user.schema";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    return Response.json(await makeUserService().getById(id));
  } catch (e) {
    return handleUserError(e);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const input = updateUserSchema.parse(await req.json());
    return Response.json(await makeUserService().updateProfile(id, input));
  } catch (e) {
    return handleUserError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    await makeUserService().remove(id);
    return new Response(null, { status: 204 });
  } catch (e) {
    return handleUserError(e);
  }
}
