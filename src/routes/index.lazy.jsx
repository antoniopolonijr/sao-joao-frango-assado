import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <img src="../favicon.svg" alt="São João Frango Assado" />
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
