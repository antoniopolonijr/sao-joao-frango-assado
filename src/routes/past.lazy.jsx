import { Suspense, useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

const intl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  const [page, setPage] = useState(1);
  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  }).promise;
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Carregando Pedidos Anteriores …</h2>
          </div>
        }
      >
        <PastOrdersRoute
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrdersRoute({ loadedPromise, page, setPage }) {
  const data = use(loadedPromise);
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  });

  return (
    <div className="past-orders">
      <h2>Pedidos Anteriores</h2>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Data</td>
            <td>Horário</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Próxima
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <div className="modal-content">
            <h2>Pedido #{focusedOrder}</h2>
            {!isLoadingPastOrder ? (
              <table>
                <thead>
                  <tr>
                    <td>Imagem</td>
                    <td>Nome</td>
                    <td>Tamanho</td>
                    <td>Quantidade</td>
                    <td>Preço</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {pastOrderData.orderItems.map((food) => (
                    <tr key={`${food.foodTypeId}_${food.size}`}>
                      <td>
                        <img src={food.image} alt={food.name} />
                      </td>
                      <td>{food.name}</td>
                      <td>{food.size}</td>
                      <td>{food.quantity}</td>
                      <td>{intl.format(food.price)}</td>
                      <td>{intl.format(food.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Carregando …</p>
            )}
            <button onClick={() => setFocusedOrder()}>Fechar</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
