import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FoodOfTheDay from "../FoodOfTheDay";
import Header from "../Header";
import { CartContext } from "../contexts";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div className="app-container">
            <Header />
            <Outlet />
            <FoodOfTheDay />
          </div>
        </CartContext.Provider>
        {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
        {import.meta.env.MODE === "development" && <ReactQueryDevtools />}
      </>
    );
  },
});
