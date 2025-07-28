import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import FoodOfTheDay from "./FoodOfTheDay";

const App = () => {
  return (
    <StrictMode>
      <div>
        <h1 className="logo">São João Frango Assado</h1>
        <Order />
        <FoodOfTheDay />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
