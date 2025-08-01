import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <Link to={"/"}>
        <h1 className="logo">São João Frango Assado</h1>
      </Link>
      <div className="nav-cart">
        <Link to={"/order"} arial-label="Carrinho de Compras">
          <div>
            🛒
            <span data-testid="cart-number" className="nav-cart-number">
              {cart.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
