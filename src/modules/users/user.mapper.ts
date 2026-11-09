import type { UserEntity, UserPublic } from "./user.types";

export function toPublic(user: UserEntity): UserPublic {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    twoFactorEnabled: user.twoFactorEnabled,
    twoFactorMethod: user.twoFactorMethod,
    subscriptionType: user.subscriptionType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}