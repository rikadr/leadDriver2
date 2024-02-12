import { CreateUserPayload } from "./user-types";

export type Cookie = {
  userId: string;
};

export type Credentials = {
  userId: string;
  name: string;
  email: string;
  roles?: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = CreateUserPayload & {
  password: string;
};
