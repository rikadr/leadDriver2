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
      <h1>New event</h1>
      <input type="text" placeholder="Event name" {...form.register("name")} />
      <input
        type="text"
        placeholder="Location"
        {...form.register("location")}
      />
      <textarea placeholder="Description" {...form.register("description")} />
      <Button type="submit">Add event</Button>
    </form>
  );
};
