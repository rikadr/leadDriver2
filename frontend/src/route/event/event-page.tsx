import { useParams } from "react-router-dom";
import { useEvent } from "./event-api";
import { AttendEvent } from "./attend-event/attend-event";

export const EventPage: React.FC = () => {
  let { id } = useParams();
  const eventsQuery = useEvent(id);
  const result = eventsQuery.data?.data;
  if (!result) {
    return <>No event found</>;
  }
  const { event, youAreAttending } = result;
  return (
    <div className="px-8 py-4">
      <h1>Event</h1>
      <div className="flex gap-4">
        <h2>{event?.name}</h2>
      </div>
      <AttendEvent event={event} youAreAttending={youAreAttending} />
      <p>Attendees ({event?.attendence?.length}):</p>
      <ul>
        {event?.attendence?.map((attendee) => (
          <li
            key={attendee.id}
            className="p-2 m-2 bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer"
          >
            {attendee.user.name}, {attendee.car.model}
          </li>
        ))}
      </ul>
    </div>
  );
};
