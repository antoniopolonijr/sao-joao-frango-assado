import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Food from "../Food";

test("alt text renders on image", async () => {
  const name = "My Favorite Food";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Food name={name} description="super cool food" image={src} />
  );

  const img = await screen.getByRole("img");

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
