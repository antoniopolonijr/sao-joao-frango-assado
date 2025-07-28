import { useState, useEffect, useDebugValue } from "react";

export const useFoodOfTheDay = () => {
  const [foodOfTheDay, setFoodOfTheDay] = useState(null);

  useDebugValue(foodOfTheDay ? `${foodOfTheDay.name}` : "Carregando...");

  useEffect(() => {
    async function fetchFoodOfTheDay() {
      const response = await fetch("/api/food-of-the-day");
      const data = await response.json();
      setFoodOfTheDay(data);
    }

    fetchFoodOfTheDay();
  }, []);

  return foodOfTheDay;
};
