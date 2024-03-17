import { UserDTO } from "./user-types";

export interface IApiResponse<T = unknown, E = unknown> {
  data?: T;
  error?: string | null;
  errorData?: E;
  message?: string;
  statusCode?: number;
}

export type YouInitialsResponse = IApiResponse<{ initials?: string }>;
export type YouResponse = IApiResponse<UserDTO>;

export type LoginResponse = IApiResponse<{ message: string }>;
export type SignupResponse = IApiResponse<{ message: string }>;
