import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "./event-api";
import { AttendEvent } from "./attend-event/attend-event";
import { CarCardLink } from "../cars/car-card";
import { Card, CardGridWrapper } from "../../components/card";
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
  const { event, youAreAttending, yourCarId } = result;
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-baseline">
        <h1>{event?.name}</h1>
        <p className="max-w-lg text-gray-500 italic">
          {" "}
          Owned by {event.owner.name}
        </p>
        <div className="grow" />
        {result.yourEvent && (
          <Button
            className="right-0 top-0"
            onClick={() => navigate(getAppUrl(["event", "edit"], event.id))}
          >
            Edit event
          </Button>
        )}
      </div>
      <Card className="max-w-lg flex flex-col gap-2">
        {event.location && (
          <section className="flex items-baseline gap-1">
            <h3>Location </h3>
            <p className="max-w-lg text-gray-500 italic"> - {event.location}</p>
          </section>
        )}
        {event.description && (
          <section>
            <h3>Description</h3>
            <p className=" text-gray-500 italic">{event.description}</p>
          </section>
        )}
      </Card>
      <AttendEvent event={event} youAreAttending={youAreAttending} />
      <p>Attendees: {event?.attendence?.length}</p>
      <CardGridWrapper>
        {event?.attendence
          ?.sort((a) => (!!yourCarId && a.car.id === yourCarId ? -1 : 1))
          .map((attendee) => (
            <CarCardLink
              key={attendee.id}
              car={{
                id: attendee.car.id,
                model: attendee.car.model,
                imageUrl: attendee.car.imageUrl,
                ownerName: attendee.user.name,
              }}
              isYourCar={!!yourCarId && attendee.car.id === yourCarId}
            />
          ))}
      </CardGridWrapper>
    </div>
  );
};
