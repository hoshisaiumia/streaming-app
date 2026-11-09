export type SubscriptionType = "FREE" | "BASIC" | "DUO" | "FAMILY";
export type TwoFactorMethod = "TOTP" | "SMS" | "EMAIL";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  twoFactorEnabled: boolean;
  twoFactorMethod: TwoFactorMethod | null;
  twoFactorSecret: string | null;
  subscriptionType: SubscriptionType;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPublic = Omit<UserEntity, "passwordHash" | "twoFactorSecret">;

export interface NewUser {
  name: string;
  email: string;
  passwordHash: string;
}

export type UserUpdate = { name?: string };
