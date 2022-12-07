import React, { useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import Button, { ButtonVariant } from "../Button";
import ProductFilter from "../ProductFilter";
import { useNavigate } from "react-router-dom";
import WastageItem from "./WastageItem";
import Loader from "../Loader";
import { Product } from "../../types/Product";

const wastageLocalStorageKey = "WASTAGELOCALSTORAGE";

export default function Home() {
  const { data, error } = useProducts(wastageLocalStorageKey);
  const [productSearch, setProductSearch] = React.useState<string>("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

  const productItems = products.map((product, i) => {
    if (
      product.name
        .trim()
        .toLowerCase()
        .indexOf(productSearch.trim().toLowerCase()) !== -1
    ) {
      return <WastageItem key={product.salesItemId} product={product} />;
    }
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <ProductFilter
        productSearch={productSearch}
        setProductSearch={(updatedProductSearch) =>
          setProductSearch(updatedProductSearch)
        }
      />
      <ul>{productItems}</ul>
    </>
  );
}
