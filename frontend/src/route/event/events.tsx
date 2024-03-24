import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { appUrl } from "../../utils/app-url";
import { useEvents } from "../event/event-api";

export const Events: React.FC = () => {
  const navigate = useNavigate();
  const eventsQuery = useEvents();
  if (eventsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (!eventsQuery.data?.data) {
    return <div>No data</div>;
  }
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <h1 className="text-lg">All events</h1>
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-3 rounded-full "
          type="button"
          onClick={() => navigate(appUrl["event-add"])}
        >
          Add event +
        </button>
      </div>
      <div className="flex flex-col">
        {eventsQuery.data?.data?.map((event) => (
          <Link
            key={event.id}
            to={appUrl["event"] + "/" + event.id}
            className="p-2 m-2 w-full bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer"
          >
            Name: {event.name}, {event.attendence.length} attendees.
          </Link>
        ))}
      </div>
      {eventsQuery.data.data.length === 0 && "No events :("}
    </div>
  );
};