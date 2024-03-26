import React from "react";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useEvents } from "./event-api";
import { EventCard } from "./event-card";

export const EventsPage: React.FC = () => {
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
          onClick={() => navigate(getAppUrl(["event", "add"]))}
        >
          Add event +
        </button>
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {eventsQuery.data?.data?.map((event) => (
          <EventCard
            event={event.event}
            youAreAttending={event.youAreAttending}
          />
        ))}
      </div>
      {eventsQuery.data.data.length === 0 && "No events :("}
    </div>
  );
};
