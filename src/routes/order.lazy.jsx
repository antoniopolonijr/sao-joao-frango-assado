import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CartContext } from "../contexts";
import Cart from "../Cart";
import Food from "../Food";

const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const apiUrl = import.meta.env.VITE_API_URL;

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [foodType, setFoodType] = useState("frango_assado");
  const [foodSize, setFoodSize] = useState("G");
  const [foodTypes, setFoodTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);

    await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  let price, selectedFood;
  if (!loading) {
    selectedFood = foodTypes.find((food) => foodType === food.id);
    price = intl.format(selectedFood.sizes ? selectedFood.sizes[foodSize] : "");
  }

  useEffect(() => {
    fetchFoodTypes();
  }, []);

  async function fetchFoodTypes() {
    const foodsRes = await fetch(`${apiUrl}/api/foods`);
    const foodsJson = await foodsRes.json();
    setFoodTypes(foodsJson);
    setLoading(false);
  }

  function addToCart() {
    setCart([...cart, { food: selectedFood, size: foodSize, price }]);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Faça Seu Pedido</h2>
        <form action={addToCart}>
          <div>
            <div>
              <label htmlFor="food-type">Cardápio</label>
              <select
                onChange={(e) => setFoodType(e.target.value)}
                name="food-type"
                value={foodType}
                aria-label="Selecione o tipo de comida"
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
                    checked={foodSize === "P"}
                    type="radio"
                    name="food-size"
                    value="P"
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
                    checked={foodSize === "G"}
                    type="radio"
                    name="food-size"
                    value="G"
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
      {loading ? (
        <h2>CARREGANDO …</h2>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  );
}
