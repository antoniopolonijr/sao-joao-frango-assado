import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot with some stuff in cart", () => {
  const { asFragment } = render(
    <Cart
      cart={[
        {
          food: {
            id: "frango_assado",
            name: "Frango",
            category: "Carne",
            description: "Frango Assado com Farofa",
            image: "/public/foods/frango_assado.webp",
            sizes: {
              P: 0,
              M: 33,
              G: 50,
            },
          },
          size: "G",
          price: "R$ 50,00",
        },
        {
          food: {
            id: "nhoque",
            name: "Nhoque",
            category: "Massa",
            description: "Nhoque de Batata à Bolonhesa",
            image: "/public/foods/nhoque.webp",
            sizes: {
              P: 0,
              M: 24,
              G: 48,
            },
          },
          size: "M",
          price: "R$ 24,00",
        },
        {
          food: {
            id: "maionese",
            name: "Maionese",
            category: "Acompanhamento",
            description: "Salada de Maionese com Legumes",
            image: "/public/foods/maionese.webp",
            sizes: {
              P: 0,
              M: 24,
              G: 0,
            },
          },
          size: "M",
          price: "R$ 24,00",
        },
      ]}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
