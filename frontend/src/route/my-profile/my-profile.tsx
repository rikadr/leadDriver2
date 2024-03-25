import React from "react";
import { useYou } from "./my-profile-api";
import { Link, useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useEventsYouAttend } from "../event/event-api";

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const youQuery = useYou();
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
        <h1 className="text-lg">{youQuery.data.data.name}</h1>
        <p className="italic text-gray-500">{youQuery.data.data.email}</p>
      </div>
      <div className="flex gap-4">
        <h1 className="text-lg">My cars</h1>
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-3 rounded-full "
          type="button"
          onClick={() => navigate(getAppUrl(["car", "add"]))}
        >
          Add car +
        </button>
      </div>
      {youQuery.data.data.cars.map((car) => (
        <div
          key={car.id}
          className="p-2 m-2 bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer"
        >
          Model: {car.model}
        </div>
      ))}
      {youQuery.data.data.cars.length === 0 && "No cars :("}
      <div className="flex flex-col">
        <h2>Events you attend:</h2>
        {eventsQuery.data?.data?.map((event) => (
          <Link
            key={event.event.id}
            to={getAppUrl("event", event.event.id)}
            className="p-2 m-2 w-full bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer"
          >
            {event.event.name}, {event.event.attendence.length} attendee
            {event.event.attendence.length !== 1 ? "s" : ""}.{" "}
          </Link>
        ))}
        {eventsQuery.data?.data?.length === 0 && "You attend no events :("}
      </div>
    </div>
  );
};
