import React, { useState } from "react";
import { useAttendEventMutation } from "../event-api";
import { Card, CardGridWrapper } from "../../../components/card";
import { CarCardButton } from "../../cars/car-card";
import { useYourCars } from "../../cars/cars-api";
import { Button } from "../../../components/button";

export const AttendEventForm: React.FC<{ eventId: string }> = ({ eventId }) => {
  const yourCarsQuery = useYourCars();
  const attendEventMutation = useAttendEventMutation();
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return <Button onClick={() => setShowForm(!showForm)}>Attend</Button>;
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowForm(!showForm)}>Cancel</Button>
      <Card className="space-y-4">
        <h2>Select what car to attend with</h2>
        <CardGridWrapper>
          {yourCarsQuery.data?.data?.map((car) => (
            <CarCardButton
              key={car.id}
              car={car}
              onClick={() =>
                attendEventMutation.mutate({
                  eventId,
                  carId: car.id,
                })
              }
            />
          ))}
        </CardGridWrapper>
      </Card>
    </div>
  );
};
