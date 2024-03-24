import { useParams } from "react-router-dom";
import { useEvent } from "./event-api";

export const Event: React.FC = () => {
  let { id } = useParams();
  const eventsQuery = useEvent(id);
  const event = eventsQuery.data?.data;
  return (
    <div>
      <h1>Event</h1>
      <h2>Name: {event?.name}</h2>
      <p>Attendees ({event?.attendence?.length}):</p>
      <ul>
        {event?.attendence?.map((attendee) => (
          <li key={attendee.id}>
            {attendee.user.name}, {attendee.car.model}
          </li>
        ))}
      </ul>
    </div>
  );
};
