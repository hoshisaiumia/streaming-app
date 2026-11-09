import { PrismaUserRepository } from "./user.prisma-repository";
import { UserService } from "./user.service";

export function makeUserService() {
  return new UserService(new PrismaUserRepository());
}