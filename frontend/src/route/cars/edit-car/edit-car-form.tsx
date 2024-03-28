import React, { useEffect, useState } from "react";
import { getAppUrl } from "../../../utils/app-url";
import { CarDTO, EditCarPayload } from "shared";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/button";
import { useDeleteCarMutation, useEditCarMutation } from "../cars-api";

export const EditCarForm: React.FC<{ car: CarDTO }> = ({ car }) => {
  const navigate = useNavigate();
  const editCarMutation = useEditCarMutation();
  const deleteCarMutation = useDeleteCarMutation();
  const form = useForm<EditCarPayload>({
    defaultValues: {
      model: car.model,
      imageUrl: car.imageUrl,
    },
  });
  const imageUrlWatch = form.watch("imageUrl");

  const [isValidImageUrl, setIsValidImageUrl] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onloadstart = () => setIsValidImageUrl(false);
    image.onload = () => setIsValidImageUrl(true);
    image.onerror = () => setIsValidImageUrl(false);
    const imageUrl = form.getValues("imageUrl");
    if (imageUrl === "") {
      setIsValidImageUrl(false);
    } else if (imageUrl) {
      image.src = imageUrl;
    }
  }, [form, imageUrlWatch]);

  const handleSubmit: SubmitHandler<EditCarPayload> = async (data) => {
    const result = await editCarMutation.mutateAsync({
      ...data,
      carId: car.id,
    });
    if (!result.error) {
      navigate(getAppUrl(["car"], car.id));
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <div className="flex items-baseline justify-between">
        <h1>Edit car</h1>
        <Button
          variant="danger"
          onClick={() =>
            window.confirm("Are you sure you want to delete the car?") &&
            deleteCarMutation.mutate({ carId: car.id })
          }
        >
          Delete car
        </Button>
      </div>
      <input type="text" placeholder="Model" {...form.register("model")} />
      <input
        type="text"
        placeholder="Image URL"
        {...form.register("imageUrl")}
      />
      <div className="flex gap-4">
        <Button
          className="w-full"
          onClick={() => navigate(getAppUrl("car", car.id))}
        >
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Save
        </Button>
      </div>
      <h2>Image preview</h2>
      {isValidImageUrl && (
        <img
          src={form.getValues("imageUrl") || ""}
          alt={car?.model}
          className="max-h-96 w-full object-cover rounded-lg ring-[0.5px] ring-white/50"
        />
      )}
      {!isValidImageUrl && (
        <p className="rounded-lg ring-[0.5px] ring-white/50 p-4 h-32">
          {" "}
          {form.getValues("imageUrl") && "Invalid image url. "} Please provide a
          url that links to an image
        </p>
      )}
    </form>
  );
};
