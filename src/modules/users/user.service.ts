import { hashPassword } from "@/lib/password";
import { EmailAlreadyInUseError, UserNotFoundError } from "./user.errors";
import { toPublic } from "./user.mapper";
import type { CreateUserInput, UpdateUserInput } from "./user.schema";
import type { UserRepository } from "./user.repository";

export class UserService {
  constructor(private repo: UserRepository) {}

  async register(input: CreateUserInput) {
    if (await this.repo.findByEmail(input.email)) {
      throw new EmailAlreadyInUseError();
    }
    const passwordHash = await hashPassword(input.password);
    const user = await this.repo.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
    return toPublic(user);
  }

  async getById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new UserNotFoundError();
    return toPublic(user);
  }

  async list(page = 1, pageSize = 20) {
    const users = await this.repo.findMany((page - 1) * pageSize, pageSize);
    return users.map(toPublic);
  }

  async updateProfile(id: string, input: UpdateUserInput) {
    await this.getById(id);
    return toPublic(await this.repo.update(id, input));
  }

  async remove(id: string) {
    await this.getById(id);
    await this.repo.delete(id);
  }
}