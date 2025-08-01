const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.food.sizes[current.size];
  }
  return (
    <div className="cart">
      <h2>Carrinho</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="type">{item.food.name}</span> –{" "}
            <span className="size">{item.size}</span> –{" "}
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {intl.format(total)}</p>
      <button onClick={checkout}>Finalizar a Compra</button>
    </div>
  );
}
