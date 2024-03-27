import React from "react";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useEvents } from "./event-api";
import { EventCard } from "./event-card";
import { CardGridWrapper } from "../../components/card";
import { Button } from "../../components/button";

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
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-lg">All events</h1>
        <Button onClick={() => navigate(getAppUrl(["event", "add"]))}>
          Add event +
        </Button>
      </div>
      <CardGridWrapper>
        {eventsQuery.data?.data?.map((event) => (
          <EventCard
            key={event.event.id}
            event={event.event}
            youAreAttending={event.youAreAttending}
          />
        ))}
      </CardGridWrapper>
      {eventsQuery.data.data.length === 0 && "No events :("}
    </div>
  );
};
