import { user } from "@prisma/client";
import { UserDTO } from "../types";

export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;

  constructor(user: user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
