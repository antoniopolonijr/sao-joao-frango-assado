import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <img
        src="../foods/sao_joao_frango_assado.svg"
        alt="São João Frango Assado"
        fetchPriority="high"
        height="200"
        width="200"
      />
      <ul>
        <li>
          <Link to="/order">Faça Seu Pedido</Link>
        </li>
        <li>
          <Link to="/past">Pedidos Anteriores</Link>
        </li>
        <li>
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </div>
  );
}
