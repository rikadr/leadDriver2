import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "./event-api";
import { AttendEvent } from "./attend-event/attend-event";
import { CarCardLink } from "../cars/car-card";
import { CardGridWrapper } from "../../components/card";
import { Button } from "../../components/button";
import { getAppUrl } from "../../utils/app-url";

export const EventPage: React.FC = () => {
  let { id } = useParams();
  const eventQuery = useEvent(id);
  const navigate = useNavigate();

  const result = eventQuery.data?.data;
  if (!result) {
    return <>No event found</>;
  }
  const { event, youAreAttending } = result;
  return (
    <div className="relative space-y-4">
      {result.yourEvent && (
        <Button
          className="absolute right-0 top-0"
          onClick={() => navigate(getAppUrl(["event", "edit"], event.id))}
        >
          Edit event
        </Button>
      )}
      <h1>{event?.name}</h1>
      {event.location && (
        <section>
          <h3>Location</h3>
          <p className="max-w-lg text-gray-500 italic">{event.location}</p>
        </section>
      )}
      {event.description && (
        <section>
          <h3>Description</h3>
          <p className="max-w-lg text-gray-500 italic">{event.description}</p>
        </section>
      )}
      <section>
        <h3>Event owner</h3>
        <p className="max-w-lg text-gray-500 italic">{event.owner.name}</p>
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
