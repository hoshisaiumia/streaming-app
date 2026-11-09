import type { NewUser, UserEntity, UserUpdate } from "./user.types";

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findMany(skip: number, take: number): Promise<UserEntity[]>;
  create(data: NewUser): Promise<UserEntity>;
  update(id: string, data: UserUpdate): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
