/**
 * AUTH TYPES
 */
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

/**
 * USER TYPES
 */
export type CreateUserPayload = {
  name: string;
  email: string;
};

export interface IApiResponse<T = unknown, E = unknown> {
  params?: Record<string, any>;
  data?: T;
  //   validationErrors?: IErrorFeedbackFields;
  error?: string | null;
  errorKey?: string | null;
  errorData?: E;
  message?: string;
  statusCode?: number;
}
