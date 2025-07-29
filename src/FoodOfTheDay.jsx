import { useFoodOfTheDay } from "./useFoodOfTheDay";

const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const FoodOfTheDay = () => {
  const foodOfTheDay = useFoodOfTheDay();

  if (!foodOfTheDay) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="food-of-the-day">
      <h2>Sugestão do Chef</h2>
      <div>
        <div className="food-of-the-day-info">
          <h3>{foodOfTheDay.name}</h3>
          <p>{foodOfTheDay.description}</p>
          <p className="food-of-the-day-price">
            a partir de: <span>{intl.format(foodOfTheDay.sizes.P)}</span>
          </p>
        </div>
        <img
          className="food-of-the-day-image"
          src={foodOfTheDay.image}
          alt={foodOfTheDay.name}
        />
      </div>
    </div>
  );
};

export default FoodOfTheDay;
