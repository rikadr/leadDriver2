export type EventDTO = {
  id: string;
  name: string;
  attendence: {
    id: string;
    user: { id: string; name: string };
    car: { id: string; model: string };
  }[];
};
