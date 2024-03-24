import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCarPayload } from "shared";
import { useAddCarMutation } from "./cars-api";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";

export const AddCar: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  const addCarMutation = useAddCarMutation();

  const form = useForm<AddCarPayload>();

  const handleLogin: SubmitHandler<AddCarPayload> = async (data) => {
    const result = await addCarMutation.mutateAsync(data);
    if (result.data) {
      navigate(getAppUrl("my-profile"));
    } else {
      setMessage("Unable to add car...");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleLogin, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <input type="text" placeholder="Model" {...form.register("model")} />
      <p>{message}</p>
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-full"
        type="submit"
      >
        Add car
      </button>
    </form>
  );
};
