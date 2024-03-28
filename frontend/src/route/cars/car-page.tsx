import { useNavigate, useParams } from "react-router-dom";
import { useCar } from "./cars-api";
import { Button } from "../../components/button";
import { getAppUrl } from "../../utils/app-url";

export const CarPage: React.FC = () => {
  let { id } = useParams();
  const carQuery = useCar(id);
  const navigate = useNavigate();

  if (!carQuery.data?.data) {
    return <div>No car found</div>;
  }

  const { car, isYourCar } = carQuery.data?.data;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-4">
        <h1>{car?.model}</h1>
        <p className="text-gray-500 italic">{car?.ownerName}</p>
        <div className="grow" />
        {isYourCar && (
          <Button onClick={() => navigate(getAppUrl(["car", "edit"], car.id))}>
            Edit car
          </Button>
        )}
      </div>
      <img
        src={car?.imageUrl}
        alt={car?.model}
        className="max-h-96 w-full object-cover rounded-lg ring-[0.5px] ring-white/50"
      />
    </div>
  );
};
