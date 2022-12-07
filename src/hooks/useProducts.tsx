import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Product } from "../types/Product";
import useAuth from "./useAuth";
import { useParams } from "react-router-dom";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  });

  return res.json();
};

export default function useProducts(localStorageKey: string) {
  const { id } = useParams();
  const productEndpoint = `${process.env.REACT_APP_API_URL}/device/${id}/products`;
  const lSK = `${localStorageKey}-deviceId${id?.toString()}`;

  const { getToken } = useAuth();

  const { data, error, mutate } = useSWR(productEndpoint, (url) =>
    fetcher(url, getToken()!)
  );

  const getProductsFromLocalstorage = (): Product[] => {
    const productsFromStorage = localStorage.getItem(lSK);
    if (productsFromStorage) {
      return JSON.parse(productsFromStorage) as Product[];
    } else {
      return [];
    }
  };

  const removeProductsFromLocalStorage = () => {
    localStorage.removeItem(lSK);
  };

  const updateProductsInLocalStorage = (products: Product[]) => {
    localStorage.setItem(lSK, JSON.stringify(products));
  };

  return {
    data,
    // setProducts: setProducts,
    getProductsFromLocalstorage,
    removeProductsFromLocalStorage,
    updateProductsInLocalStorage,
    // isLoading: status !== "complete" && status !== "idle",
    // isError: false,
    error: error,
    productEndpoint,
  };
}
