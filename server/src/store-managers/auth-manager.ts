import { PrismaClient, user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { SignupPayload } from "../types";
import { AuthStore } from "../stores/auth-store";

export class AuthManager {
  constructor(private authStore: AuthStore, private userStore: UserStore) {}

  async signUp(payload: SignupPayload): Promise<user> {
    const existingUser = await this.userStore.findOneByEmail({
      email: payload.email,
    });

    console.log("existingUser", existingUser);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    console.log("next step");

    const user = await this.userStore.createUser(payload);

    console.log("user", user);

    await this.authStore.createOne({
      userId: user.id,
      password: payload.password, // Todo hash password
    });

    return user;
  }

  async passwordStringMatch({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): Promise<boolean> {
    const authRecord = await this.authStore.findOne({ userId });
    if (!authRecord) {
      throw new Error("User auth not found");
    }
    if (authRecord.hash === password) {
      return true;
    } else {
      return false;
    }
  }
}
