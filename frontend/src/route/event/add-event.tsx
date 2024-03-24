import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddEventPayload } from "shared";
import { useNavigate } from "react-router-dom";
import { appUrl } from "../../utils/app-url";
import { useAddEventMutation } from "./event-api";

export const AddEvent: React.FC = () => {
  const navigate = useNavigate();
  const addEventMutation = useAddEventMutation();
  const form = useForm<AddEventPayload>();

  const handleSubmit: SubmitHandler<AddEventPayload> = async (data) => {
    const result = await addEventMutation.mutateAsync(data);
    console.log("result", result.data);
    if (!result.error) {
      navigate(appUrl["my-profile"]);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <input type="text" placeholder="Event name" {...form.register("name")} />
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-full"
        type="submit"
      >
        Add event
      </button>
    </form>
  );
};
