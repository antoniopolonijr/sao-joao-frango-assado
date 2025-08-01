import { render, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient({});

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = screen.getByPlaceholderText("Nome");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Mensagem");

  const testData = {
    name: "Antonio",
    email: "test@example.com",
    message: "This is a test message",
  };

  fireEvent.change(nameInput, { target: { value: testData.name } });
  fireEvent.change(emailInput, { target: { value: testData.email } });
  fireEvent.change(msgTextArea, { target: { value: testData.message } });

  const form = screen.container.querySelector("form");
  fireEvent.submit(form);

  const h3 = await screen.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("Enviado!");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  const apiUrl = import.meta.env.VITE_API_URL;
  expect(requests[0].url).toBe(`${apiUrl}/api/contact`);
  expect(fetchMocker).toHaveBeenCalledWith(`${apiUrl}/api/contact`, {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
