import { CarDTO } from "./car-types";
import { EventDTO } from "./event-types";
import { UserDTO } from "./user-types";

export interface IApiResponse<T = unknown, E = unknown> {
  data?: T;
  error?: string | null;
  errorData?: E;
  message?: string;
  statusCode?: number;
}

export type LoginResponse = IApiResponse<{ message: string }>;
export type SignupResponse = IApiResponse<{ message: string }>;

export type CheckLoginResponse = IApiResponse<{ isLoggedIn: boolean }>;

export type YouInitialsResponse = IApiResponse<{ initials?: string }>;
export type YouResponse = IApiResponse<UserDTO>;

export type FeedResponse = IApiResponse<{ posts: string[] }>;

export type AddCarPayload = { model: string };
export type AddCarResponse = IApiResponse<CarDTO>;

export type GetEventPayload = { eventId: string };
export type GetEventResponse = IApiResponse<EventDTO>;

export type AddEventPayload = { name: string };
export type AddEventResponse = IApiResponse<{ eventId: string }>;
