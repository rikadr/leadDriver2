import { user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { LoginPayload, SignupPayload } from "../types";
import { compare, hash } from "bcrypt";
import { badData, notFound } from "@hapi/boom";

export class AuthManager {
  constructor(private userStore: UserStore) {}

  async signUp(payload: SignupPayload): Promise<user> {
    const existingUser = await this.userStore.findOneByEmail({
      email: payload.email,
    });
    if (existingUser) {
      throw badData("User with this email already exists");
    }

    const passwordHash = await hash(payload.password, 10);

    const newUser = await this.userStore.createUser({
      user: { name: payload.name, email: payload.email },
      passwordHash,
    });

    return newUser;
  }

  async authenticateUserAndPassword({
    email,
    password,
  }: LoginPayload): Promise<user> {
    try {
      const user = await this.userStore.findOneByEmail({ email });
      if (!user) {
        throw new Error();
      }
      const passwordMatch = compare(password, user.passwordHash);
      if (!passwordMatch) {
        throw new Error();
      }

      return user;
    } catch (err) {
      throw notFound("Email or password is incorrect");
    }
  }
}
