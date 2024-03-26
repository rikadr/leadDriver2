import React from "react";
import { useYou } from "./my-profile-api";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useEventsYouAttend } from "../event/event-api";
import { EventCard } from "../event/event-card";
import { CarCard } from "../cars/car-card";
import { useYourCars } from "../cars/cars-api";
import { CardGridWrapper } from "../../components/card";

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const youQuery = useYou();
  const yourCarsQuery = useYourCars();
  const eventsQuery = useEventsYouAttend();
  if (youQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (!youQuery.data?.data) {
    return <div>No data</div>;
  }
  return (
    <div className="p-4 space-y-4">
      <div>
        <h1>{youQuery.data.data.name}</h1>
        <p className="italic text-gray-500">{youQuery.data.data.email}</p>
      </div>
      <div className="flex gap-4">
        <h2>My cars</h2>
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-3 rounded-full "
          type="button"
          onClick={() => navigate(getAppUrl(["car", "add"]))}
        >
          Add car +
        </button>
      </div>
      <CardGridWrapper>
        {yourCarsQuery.data?.data?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </CardGridWrapper>
      {youQuery.data.data.cars.length === 0 && "No cars :("}
      <h2>Events you attend:</h2>
      <CardGridWrapper>
        {eventsQuery.data?.data?.map((event) => (
          <EventCard
            key={event.event.id}
            event={event.event}
            youAreAttending={event.youAreAttending}
          />
        ))}
      </CardGridWrapper>
      {eventsQuery.data?.data?.length === 0 && "You attend no events :("}
    </div>
  );
};
