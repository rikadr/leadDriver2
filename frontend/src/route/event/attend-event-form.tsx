import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AttendEventPayload } from "shared";
import { useYou } from "../my-profile/my-profile-api";
import { useAttendEventMutation } from "./event-api";

export const AttendEventForm: React.FC<{ eventId: string }> = ({ eventId }) => {
  const youQuery = useYou();
  const attendEventMutation = useAttendEventMutation();
  const form = useForm<AttendEventPayload>({ defaultValues: { eventId } });

  const handleSubmit: SubmitHandler<AttendEventPayload> = async (data) => {
    await attendEventMutation.mutateAsync(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96"
    >
      <select {...form.register("carId")}>
        <option>Select what car to attend with</option>
        {youQuery.data?.data?.cars?.map((car) => (
          <option key={car.id} value={car.id}>
            {car.model}
          </option>
        ))}
      </select>
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-full"
        type="submit"
      >
        Attend
      </button>
    </form>
  );
};
