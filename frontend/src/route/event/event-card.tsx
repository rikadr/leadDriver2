import { Link } from "react-router-dom";
import { EventAttendence, EventDTO } from "shared";
import { getAppUrl } from "../../utils/app-url";

export const EventCard: React.FC<{
  event: EventDTO;
  youAreAttending: boolean;
}> = ({ event, youAreAttending }) => {
  const description =
    "Qui quis incididunt esse ex deserunt eiusmod ex consequat qui et esse duis commodo velit. Qui et esse duis commodo velit.";
  return (
    <Link
      to={getAppUrl("event", event.id)}
      className="
      p-4 flex flex-col gap-2
      rounded-lg 
      ring-[0.5px] ring-white/50 
      hover:bg-gradient-to-t from-sky-700/20 to-zink-900
      transition-all duration-150"
    >
      <h1 className="font-bold text-lg">{event.name}</h1>
      <p className="text-gray-500 text-sm italic font-light">
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </p>
      <p>
        {event.attendence.length} car{event.attendence.length !== 1 && "s"}
        <div className="flex">
          {event.attendence.map((attendence) => (
            <CarBouble attendence={attendence} />
          ))}
        </div>
      </p>
      {youAreAttending && (
        <div className="bg-sky-900 -mx-4 -mb-4 rounded-b-lg px-4 py-1 font-light text-sm">
          You are attending
        </div>
      )}
    </Link>
  );
};

const CarBouble: React.FC<{ attendence: EventAttendence }> = ({
  attendence: { car },
}) => {
  return (
    <Link
      to={getAppUrl("car", car.id)}
      className="aspect-square h-7 -mr-1.5 rounded-full flex items-center justify-center bg-sky-500 hover:bg-sky-700  hover:ring-1 ring-white/50 transition-all duration-150"
    >
      <p>{car.model[0]}</p>
    </Link>
  );
};
