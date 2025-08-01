import { useState, useEffect, useDebugValue } from "react";

export const useFoodOfTheDay = () => {
  const [foodOfTheDay, setFoodOfTheDay] = useState(null);

  useDebugValue(foodOfTheDay ? `${foodOfTheDay.name}` : "Carregando...");

  useEffect(() => {
    async function fetchFoodOfTheDay() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/food-of-the-day`);
      const data = await response.json();
      setFoodOfTheDay(data);
    }

    fetchFoodOfTheDay();
  }, []);

  return foodOfTheDay;
};
