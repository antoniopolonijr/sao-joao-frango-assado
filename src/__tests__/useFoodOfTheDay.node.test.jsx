import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { useFoodOfTheDay } from "../useFoodOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testFood = {
  id: "frango_assado",
  name: "Frango",
  category: "Carne",
  description: "Frango Assado com Farofa",
  image: "/public/foods/frango_assado.webp",
  sizes: { P: 0, M: 33, G: 50 },
};

test("to be null on initial load", async () => {
  fetch.mockResponseOnce(JSON.stringify(testFood));
  const { result } = renderHook(() => useFoodOfTheDay(""));
  expect(result.current).toBeNull();
});

test("to call the API and give back the food of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testFood));
  const { result } = renderHook(() => useFoodOfTheDay(""));
  await waitFor(() => {
    expect(result.current).toEqual(testFood);
  });
  expect(fetchMocker).toBeCalledWith("/api/food-of-the-day");
});
