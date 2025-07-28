import { useState } from "react";
import Food from "./Food";

export default function Order() {
  const [foodType, setFoodType] = useState("frango_assado");
  const [foodSize, setFoodSize] = useState("L");

  return (
    <div className="order">
      <h2>Faça seu Pedido</h2>
      <form>
        <div>
          <div>
            <label htmlFor="food-type">Cardápio</label>
            <select
              onChange={(e) => setFoodType(e.target.value)}
              name="food-type"
              value={foodType}
            >
              <option value="frango_assado">Frango Assado</option>
              <option value="maionese">Maionese</option>
              <option value="nhoque">Nhoque</option>
            </select>
          </div>
          <div>
            <label htmlFor="food-size">Tamanho</label>
            <div>
              <span>
                <input
                  checked={foodSize === "S"}
                  onChange={(e) => setFoodSize(e.target.value)}
                  type="radio"
                  name="food-size"
                  value="S"
                  id="food-s"
                />
                <label htmlFor="food-s">Pequeno</label>
              </span>
              <span>
                <input
                  checked={foodSize === "M"}
                  onChange={(e) => setFoodSize(e.target.value)}
                  type="radio"
                  name="food-size"
                  value="M"
                  id="food-m"
                />
                <label htmlFor="food-m">Médio</label>
              </span>
              <span>
                <input
                  checked={foodSize === "L"}
                  onChange={(e) => setFoodSize(e.target.value)}
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
        <div className="order-food">
          <Food
            name="Frango Assado"
            description="Frango Assado com Farofa"
            image="/public/foods/frango_assado.webp"
          />
          <p>R$ 50,00</p>
        </div>
      </form>
    </div>
  );
}
