import { Link } from "react-router-dom";
import { EventAttendence, EventDTO } from "shared";
import { getAppUrl } from "../../utils/app-url";
import { Card } from "../../components/card";

export const EventCard: React.FC<{
  event: EventDTO;
  youAreAttending: boolean;
}> = ({ event, youAreAttending }) => {
  const description =
    "Qui quis incididunt esse ex deserunt eiusmod ex consequat qui et esse duis commodo velit. Qui et esse duis commodo velit.";
  return (
    <Link to={getAppUrl("event", event.id)}>
      <Card hoverEffects className="h-full flex flex-col gap-2 ">
        <h1>{event.name}</h1>
        <p className="text-gray-500 italic">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
        <p>
          {event.attendence.length} car{event.attendence.length !== 1 && "s"}
        </p>
        <div className="flex">
          {event.attendence.map((attendence) => (
            <CarBouble key={attendence.id} attendence={attendence} />
          ))}
        </div>
        {youAreAttending && (
          <div className="bg-sky-900 -mx-4 -mb-4 rounded-b-lg px-4 py-1">
            <p>You are attending</p>
          </div>
        )}
      </Card>
    </Link>
  );
};

const CarBouble: React.FC<{ attendence: EventAttendence }> = ({
  attendence: { car },
}) => {
  return (
    <div className="aspect-square h-7 -mr-1.5 rounded-full shadow-lg flex items-center justify-center bg-sky-500 hover:bg-sky-700 hover:ring-1 ring-sky-200 transition-all duration-150">
      <p>{car.model[0]}</p>
    </div>
  );
};
