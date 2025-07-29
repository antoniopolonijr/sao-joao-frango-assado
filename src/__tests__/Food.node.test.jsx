import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Food from "../Food";

afterEach(cleanup);

test("alt text renders on image", async () => {
  const name = "My Favorite Food";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Food name={name} description="super cool food" image={src} />
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("to have default image if none is provided", async () => {
  const screen = render(
    <Food name={"Cool Food"} description="super cool food" />
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
