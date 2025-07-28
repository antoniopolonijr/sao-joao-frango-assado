import { createRoot } from "react-dom/client";
import Food from "./Food";

const App = () => {
  return (
    <div>
      <h1 className="logo">São João Frango Assado</h1>
      <Food
        name="Frango Assado"
        description="Frango Assado com Farofa"
        image={"/public/foods/frango-assado.webp"}
      />
      <Food
        name="Maionese"
        description="Maionese de Legumes"
        image={"/public/foods/maionese.webp"}
      />
      <Food
        name="Nhoque"
        description="Nhoque à Bolonhesa"
        image={"/public/foods/nhoque.webp"}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
