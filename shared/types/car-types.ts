import { UserDTO } from "./user-types";

export type CarDTO = {
  id: string;
  model: string;
  ownerName?: string;
};

export type CreateUCarPayload = {
  model: string;
  ownerId: string;
};
