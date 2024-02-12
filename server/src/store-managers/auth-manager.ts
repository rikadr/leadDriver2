import { UserStore } from "../stores/user-store";
import { compare, hash } from "bcrypt";
import { badData, unauthorized } from "@hapi/boom";
import { User } from "../classes/user";
import { LoginPayload, SignupPayload } from "shared";

export class AuthManager {
  constructor(private userStore: UserStore) {}

  async signUp(payload: SignupPayload): Promise<User> {
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
  }: LoginPayload): Promise<User> {
    try {
      const user = await this.userStore.findOneByEmail({ email });
      if (!user) {
        throw new Error();
      }
      const passwordMatch = await compare(password, user.passwordHash);
      if (!passwordMatch) {
        throw new Error();
      }

      return user;
    } catch (err) {
      throw unauthorized("Email or password is incorrect");
    }
  }
}
