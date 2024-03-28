export type EventDTO = {
  id: string;
  name: string;
  location?: string;
  description?: string;
  owner: { id: string; name: string };
  attendence: EventAttendence[];
};

export type EventAttendence = {
  id: string;
  user: { id: string; name: string };
  car: { id: string; model: string; imageUrl?: string };
};

export type GetEventType = "ALL" | "ATTENDING" | "OWNED";
