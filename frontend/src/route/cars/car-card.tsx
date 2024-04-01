import { Link } from "react-router-dom";
import { CarDTO } from "shared";
import { getAppUrl } from "../../utils/app-url";
import { Card } from "../../components/card";

export const CarCard: React.FC<{
  car: CarDTO;
  isYourCar?: boolean;
  hoverEffects?: boolean;
}> = ({ car, isYourCar = false, hoverEffects }) => {
  return (
    <Card
      hoverEffects={hoverEffects}
      className="h-full relative overflow-hidden"
    >
      {isYourCar && (
        <div className="absolute top-0 right-0 py-0.5 px-4 rounded-bl-lg bg-gradient-to-r from-sky-500 to-sky-900 select-none">
          <p>Your car</p>
        </div>
      )}
      <div className="flex gap-4">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt="Car"
            className="aspect-square h-16 object-cover rounded-full"
          />
        ) : (
          <div className="aspect-square h-16 rounded-full bg-sky-500 flex items-center justify-center">
            <h1 className="text-2xl">{car.model[0]}</h1>
          </div>
        )}
        <section>
          <h1>{car.model}</h1>
          <p className="text-gray-500 italic">{car.ownerName}</p>
        </section>
      </div>
    </Card>
  );
};

export const CarCardLink: React.FC<{
  car: CarDTO;
  isYourCar?: boolean;
}> = ({ car, isYourCar }) => {
  return (
    <Link to={getAppUrl("car", car.id)}>
      <CarCard car={car} isYourCar={isYourCar} hoverEffects />
    </Link>
  );
};

export const CarCardButton: React.FC<{
  car: CarDTO;
  isYourCar?: boolean;
  onClick: () => void;
}> = ({ car, isYourCar, onClick }) => {
  return (
    <button onClick={onClick}>
      <CarCard car={car} isYourCar={isYourCar} hoverEffects />
    </button>
  );
};
