import { prisma } from "@/lib/prisma";
import { EmailAlreadyInUseError } from "./user.errors";
import type { UserRepository } from "./user.repository";
import type { NewUser, UserUpdate } from "./user.types";

export class PrismaUserRepository implements UserRepository {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findMany(skip: number, take: number) {
    return prisma.user.findMany({ skip, take, orderBy: { createdAt: "desc" } });
  }

  async create(data: NewUser) {
    try {
      return await prisma.user.create({ data });
    } catch (e) {
      if ((e as { code?: string }).code === "P2002") {
        throw new EmailAlreadyInUseError();
      }
      throw e;
    }
  }

  update(id: string, data: UserUpdate) {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }
}