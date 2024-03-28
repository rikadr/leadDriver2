import React from "react";
import { getAppUrl } from "../../../utils/app-url";
import { EditEventPayload, EventDTO } from "shared";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/button";
import { useEditEventMutation } from "../event-api";

export const EditEventForm: React.FC<{ event: EventDTO }> = ({ event }) => {
  const navigate = useNavigate();
  const editEventMutation = useEditEventMutation();
  const form = useForm<EditEventPayload>({
    defaultValues: {
      name: event.name,
      location: event.location,
      description: event.description,
    },
  });

  const handleSubmit: SubmitHandler<EditEventPayload> = async (data) => {
    const result = await editEventMutation.mutateAsync({
      ...data,
      eventId: event.id,
    });
    if (!result.error) {
      navigate(getAppUrl(["event"], event.id));
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <h1>Edit event</h1>
      <input type="text" placeholder="Event name" {...form.register("name")} />
      <input
        type="text"
        placeholder="Location"
        {...form.register("location")}
      />
      <textarea placeholder="Description" {...form.register("description")} />
      <div className="flex gap-4">
        <Button
          className="w-full"
          onClick={() => navigate(getAppUrl("event", event.id))}
        >
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
