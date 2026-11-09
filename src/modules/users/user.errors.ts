export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("E-mail already in use");
    this.name = "EmailAlreadyInUseError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

export class PasswordTooShort extends Error {
  constructor() {
    super("Passwords need to be at least 8 characters long.");
    this.name = "PasswordTooShortError";
  }
}
