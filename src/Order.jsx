import { useState, useEffect } from "react";
import Food from "./Food";

const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Order() {
  const [foodType, setFoodType] = useState("frango_assado");
  const [foodSize, setFoodSize] = useState("L");
  const [foodTypes, setFoodTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  let price, selectedFood;
  if (!loading) {
    selectedFood = foodTypes.find((food) => foodType === food.id);
    price = intl.format(selectedFood.sizes ? selectedFood.sizes[foodSize] : "");
  }

  useEffect(() => {
    fetchFoodTypes();
  }, []);

  async function fetchFoodTypes() {
    const foodsRes = await fetch("/api/foods");
    const foodsJson = await foodsRes.json();
    setFoodTypes(foodsJson);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>Faça Seu Pedido</h2>
      <form>
        <div>
          <div>
            <label htmlFor="food-type">Cardápio</label>
            <select
              onChange={(e) => setFoodType(e.target.value)}
              name="food-type"
              value={foodType}
            >
              {foodTypes.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="food-size">Tamanho</label>
            <div>
              <span>
                <input
                  onChange={(e) => setFoodSize(e.target.value)}
                  checked={foodSize === "S"}
                  type="radio"
                  name="food-size"
                  value="S"
                  id="food-s"
                />
                <label htmlFor="food-s">Pequeno</label>
              </span>
              <span>
                <input
                  onChange={(e) => setFoodSize(e.target.value)}
                  checked={foodSize === "M"}
                  type="radio"
                  name="food-size"
                  value="M"
                  id="food-m"
                />
                <label htmlFor="food-m">Médio</label>
              </span>
              <span>
                <input
                  onChange={(e) => setFoodSize(e.target.value)}
                  checked={foodSize === "L"}
                  type="radio"
                  name="food-size"
                  value="L"
                  id="food-l"
                />
                <label htmlFor="food-l">Grande</label>
              </span>
            </div>
          </div>
          <button type="submit">Adicionar ao Carrinho</button>
        </div>
        {loading ? (
          <h3>CARREGANDO …</h3>
        ) : (
          <div className="order-food">
            <Food
              name={selectedFood.name}
              description={selectedFood.description}
              image={selectedFood.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
}
