import { Link } from "react-router-dom";
import { CarDTO } from "shared";
import { getAppUrl } from "../../utils/app-url";
import { Card } from "../../components/card";

export const CarCard: React.FC<{
  car: CarDTO;
  hoverEffects?: boolean;
}> = ({ car, hoverEffects }) => {
  return (
    <Card hoverEffects={hoverEffects} className="h-full">
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
}> = ({ car }) => {
  return (
    <Link to={getAppUrl("car", car.id)}>
      <CarCard car={car} hoverEffects />
    </Link>
  );
};

export const CarCardButton: React.FC<{
  car: CarDTO;
  onClick: () => void;
}> = ({ car, onClick }) => {
  return (
    <button onClick={onClick}>
      <CarCard car={car} hoverEffects />
    </button>
  );
};
