import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>São João Frango Assado</h1>
        <p>Comida Caseira e Ambiente Familiar</p>
      </div>
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
