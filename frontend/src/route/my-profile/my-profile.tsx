import React from "react";
import { useYou } from "./my-profile-api";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useEvents } from "../event/event-api";
import { EventCard } from "../event/event-card";
import { CarCardLink } from "../cars/car-card";
import { useYourCars } from "../cars/cars-api";
import { CardGridWrapper } from "../../components/card";
import { Button } from "../../components/button";

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const youQuery = useYou();
  const yourCarsQuery = useYourCars();
  const ownedEventsQuery = useEvents("OWNED");
  const attendingEventsQuery = useEvents("ATTENDING");
  if (youQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (!youQuery.data?.data) {
    return <div>No data</div>;
  }
  return (
    <div className="space-y-4">
      <div>
        <h1>{youQuery.data.data.name}</h1>
        <p className="italic text-gray-500">{youQuery.data.data.email}</p>
      </div>
      <div className="flex items-baseline justify-between">
        <h2>My cars ({yourCarsQuery.data?.data?.length})</h2>
        <Button onClick={() => navigate(getAppUrl(["car", "add"]))}>
          Add car +
        </Button>
      </div>
      <CardGridWrapper>
        {yourCarsQuery.data?.data?.map((car) => (
          <CarCardLink key={car.id} car={car} />
        ))}
      </CardGridWrapper>
      {youQuery.data.data.cars.length === 0 && "No cars :("}
      <div className="flex items-baseline justify-between">
        <h2>Events you own ({ownedEventsQuery.data?.data?.length})</h2>
        <Button onClick={() => navigate(getAppUrl(["event", "add"]))}>
          Add event +
        </Button>
      </div>
      <CardGridWrapper>
        {ownedEventsQuery.data?.data?.map((event) => (
          <EventCard
            key={event.event.id}
            event={event.event}
            yourEvent={event.yourEvent}
            youAreAttending={event.youAreAttending}
          />
        ))}
        {ownedEventsQuery.data?.data?.length === 0 && (
          <p className="text-gray-500 italic">You own no events :(</p>
        )}
      </CardGridWrapper>
      <h2>Events you attend ({attendingEventsQuery.data?.data?.length})</h2>
      <CardGridWrapper>
        {attendingEventsQuery.data?.data?.map((event) => (
          <EventCard
            key={event.event.id}
            event={event.event}
            yourEvent={event.yourEvent}
            youAreAttending={event.youAreAttending}
          />
        ))}
        {attendingEventsQuery.data?.data?.length === 0 && (
          <p className="text-gray-500 italic">You attend no events :(</p>
        )}
      </CardGridWrapper>
    </div>
  );
};
