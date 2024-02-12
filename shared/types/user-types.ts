import { CarDTO } from "./car-types";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  cars: CarDTO[];
};

export type CreateUserPayload = {
  name: string;
  email: string;
};
