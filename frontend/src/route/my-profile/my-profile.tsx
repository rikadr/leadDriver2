import React from "react";
import { useYou } from "./my-profile-api";

export const MyProfile: React.FC = () => {
  const youQuery = useYou();
  if (youQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (!youQuery.data?.data) {
    return <div>No data</div>;
  }
  return (
    <div className="p-4">
      <div>
        <h1 className="text-lg">{youQuery.data.data.name}</h1>
        <p className="italic text-gray-500">{youQuery.data.data.email}</p>
      </div>
      <h1 className="text-lg">Cars</h1>
      <p className="italic text-gray-500">
        {youQuery.data.data.cars.map((car) => (
          <div className="p-2 m-2 bg-sky-200 hover:bg-sky-100 transition-colors duration-200 cursor-pointer">
            Model: {car.model}
          </div>
        ))}
        {youQuery.data.data.cars.length === 0 && "No cars :("}
      </p>
    </div>
  );
};
