import { CarDTO } from "./car-types";
import { EventDTO, GetEventType } from "./event-types";
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

export type AddCarPayload = { model: string; imageUrl?: string };
export type AddCarResponse = IApiResponse<CarDTO>;

export type EditCarPayload = {
  carId: string;
  model: string;
  imageUrl?: string;
};

export type DeleteCarPayload = {
  carId: string;
};

export type GetCarPayload = { carId: string };
export type GetCarResponse = IApiResponse<{ car: CarDTO; isYourCar: boolean }>;
export type GetCarsResponse = IApiResponse<CarDTO[]>;

export type GetEventPayload = { eventId: string };
export type GetEventResponse = IApiResponse<{
  event: EventDTO;
  yourEvent: boolean;
  youAreAttending: boolean;
  yourCarId?: string;
}>;

export type GetEventsPayload = { type: GetEventType };
export type GetEventsResponse = IApiResponse<
  {
    event: EventDTO;
    yourEvent: boolean;
    youAreAttending: boolean;
    yourCarId?: string;
  }[]
>;

export type AddEventPayload = {
  name: string;
  description?: string;
  location?: string;
};

export type EditEventPayload = {
  eventId: string;
  name: string;
  description?: string;
  location?: string;
};

export type DeleteEventPayload = {
  eventId: string;
};

export type AddEventResponse = IApiResponse<{ eventId: string }>;

export type AttendEventPayload = { eventId: string; carId: string };
export type RevokeAttendenceEventPayload = { eventId: string };
