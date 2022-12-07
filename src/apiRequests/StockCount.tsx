import { Product } from "../types/Product";
import { ProductStockCount } from "../types/ProductStockCount";

const stockCountEndpoint = `${process.env.REACT_APP_API_URL}/stockcount`;

const postStockcount = (
  stockCounts: ProductStockCount[],
  authToken: string
) => {
  return fetch(stockCountEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stockCounts: stockCounts }),
  });
};

const putStockCount = (data: { stockCount: number; stockCountId: number }) => {
  return fetch(stockCountEndpoint, {
    method: "PUT",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  }).then(
    (res) => res.json(),
    (error) => error
  );
};

const deleteStockCountPromise = (data: { stockCountId: number }) => {
  return fetch(stockCountEndpoint, {
    method: "DELETE",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  }).then(
    (res) => res.json(),
    (error) => console.log(error)
  );
};

const createStockCount = (
  product: Product,
  actualAmount: number
): ProductStockCount => {
  return {
    productId: product.salesItemId,
    deviceId: 1,
    salesAreaId: 1,
    stockCount: actualAmount,
  };
};

export {
  postStockcount,
  deleteStockCountPromise,
  putStockCount,
  createStockCount,
  stockCountEndpoint,
};
