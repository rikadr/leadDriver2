import { Link } from "react-router-dom";
import { EventDTO } from "shared";
import { getAppUrl } from "../../utils/app-url";
import { Card } from "../../components/card";
import { classNames } from "../../common/class-names-utils";

export const EventCard: React.FC<{
  event: EventDTO;
  yourEvent: boolean;
  youAreAttending: boolean;
}> = ({ event, yourEvent, youAreAttending }) => {
  const description = event.description ?? "";
  return (
    <Link to={getAppUrl("event", event.id)}>
      <Card hoverEffects className="h-full flex flex-col gap-2 ">
        <div>
          <h1>{event.name}</h1>
          {event.location && <p>{event.location}</p>}
        </div>
        <p className="text-gray-500 italic">
          {(description?.length || 0) > 100
            ? description?.slice(0, 100) + "..."
            : description}
        </p>
        <div className="grow" />
        <p>
          {event.attendence.length} car{event.attendence.length !== 1 && "s"}
        </p>
        <div className="flex">
          {event.attendence.map((attendence) => (
            <CarBouble
              key={attendence.id}
              imageUrl={attendence.car.imageUrl}
              model={attendence.car.model}
            />
          ))}
        </div>
        {(yourEvent || youAreAttending) && (
          <div
            className={classNames(
              "flex gap-1 -mx-4 -mb-4 rounded-b-lg px-4 py-1",
              yourEvent
                ? "bg-gradient-to-r from-sky-500 to-sky-900 to-50%"
                : "bg-sky-900"
            )}
          >
            {yourEvent && <p className="font-semibold"> ⭐️ Your event. </p>}
            {youAreAttending && <p>You are attending. </p>}
          </div>
        )}
      </Card>
    </Link>
  );
};

const CarBouble: React.FC<{ imageUrl: string | undefined; model: string }> = ({
  imageUrl,
  model,
}) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="Car"
        className="aspect-square h-7 object-cover -mr-1.5 rounded-full shadow-lg hover:ring-1 ring-sky-200 transition-all duration-150"
      ></img>
    );
  } else {
    return (
      <div className="aspect-square h-7 -mr-1.5 rounded-full shadow-lg flex items-center justify-center bg-sky-500 hover:bg-sky-700 hover:ring-1 ring-sky-200 transition-all duration-150">
        <p>{model[0]}</p>
      </div>
    );
  }
};
