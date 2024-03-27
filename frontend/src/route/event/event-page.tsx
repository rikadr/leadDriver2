import { useParams } from "react-router-dom";
import { useEvent } from "./event-api";
import { AttendEvent } from "./attend-event/attend-event";
import { CarCardLink } from "../cars/car-card";
import { CardGridWrapper } from "../../components/card";

export const EventPage: React.FC = () => {
  let { id } = useParams();
  const eventQuery = useEvent(id);

  const result = eventQuery.data?.data;
  if (!result) {
    return <>No event found</>;
  }
  const { event, youAreAttending } = result;
  return (
    <div className="space-y-4">
      <h1>{event?.name}</h1>
      {event.location && (
        <section>
          <h3 className="text-gray-500 italic">Location</h3>
          <p>{event.location}</p>
        </section>
      )}
      {event.description && (
        <section>
          <h3 className="text-gray-500 italic">Description</h3>
          <p>{event.description}</p>
        </section>
      )}
      <section>
        <h3 className="text-gray-500 italic">Event owner</h3>
        <p>{event.owner.name}</p>
      </section>
      <AttendEvent event={event} youAreAttending={youAreAttending} />
      <p>Attendees: {event?.attendence?.length}</p>
      <CardGridWrapper>
        {event?.attendence?.map((attendee) => (
          <CarCardLink
            key={attendee.id}
            car={{
              id: attendee.car.id,
              model: attendee.car.model,
              imageUrl: attendee.car.imageUrl,
              ownerName: attendee.user.name,
            }}
          />
        ))}
      </CardGridWrapper>
    </div>
  );
};
