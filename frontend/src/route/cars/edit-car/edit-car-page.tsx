import React from "react";
import { useParams } from "react-router-dom";
import { useCar } from "../cars-api";
import { EditCarForm } from "./edit-car-form";

export const EditCarPage: React.FC = () => {
  const { id } = useParams();
  const carQuery = useCar(id);

  if (!id || !carQuery.data?.data) {
    return <>No car found</>;
  }

  if (!carQuery.data.data.isYourCar) {
    return <>You can only edit your own cars</>;
  }

  return <EditCarForm car={carQuery.data.data.car} />;
};
