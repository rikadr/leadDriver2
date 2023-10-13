import { user } from "@prisma/client";
import { UserDTO } from "../types";

export class User {
  private id: string;
  private email: string;
  private passwordHash: string;
  private name: string;

  constructor(user: user) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.name = user.name;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }
}
