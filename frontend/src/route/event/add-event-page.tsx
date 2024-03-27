import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddEventPayload } from "shared";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";
import { useAddEventMutation } from "./event-api";
import { Button } from "../../components/button";

export const AddEventPage: React.FC = () => {
  const navigate = useNavigate();
  const addEventMutation = useAddEventMutation();
  const form = useForm<AddEventPayload>();

  const handleSubmit: SubmitHandler<AddEventPayload> = async (data) => {
    const result = await addEventMutation.mutateAsync(data);
    if (!result.error) {
      navigate(getAppUrl(["event"], result.data?.eventId));
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <input
        type="text"
        placeholder="Event name"
        className="text-black"
        {...form.register("name")}
      />
      <Button type="submit">Add event</Button>
    </form>
  );
};
