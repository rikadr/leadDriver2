import { useParams } from "react-router-dom";
import { useEvent } from "./event-api";
import { AttendEventForm } from "./attend-event-form";
import { useState } from "react";

export const Event: React.FC = () => {
  let { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const eventsQuery = useEvent(id);
  const event = eventsQuery.data?.data;
  return (
    <div className="px-8 py-4">
      <h1>Event</h1>
      <div className="flex gap-4">
        <h2>{event?.name}</h2>
        <div className="space-y-4">
          <button
            className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-3 rounded-full "
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Attend ..."}
          </button>
          {event && showForm && <AttendEventForm eventId={event.id} />}
        </div>
      </div>
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
