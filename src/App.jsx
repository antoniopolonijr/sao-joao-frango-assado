import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1 className="logo">São João Frango Assado</h1>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
