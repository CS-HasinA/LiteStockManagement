import React, { useEffect } from "react";
import { postStockcount } from "../../apiRequests/StockCount";
import useProducts from "../../hooks/useProducts";
import { notifySuccess } from "../../utils/toastUtils";
import ProductFilter from "../ProductFilter";
import { useNavigate } from "react-router-dom";
import ReplenishStockItem from "./ReplenishStockItem";
import useAuth from "../../hooks/useAuth";
import { ProductStockCount } from "../../types/ProductStockCount";
import StickyButton from "../StickyButton";
import StockCountSummary from "../StockCountSummary";
import Loader from "../Loader";
import { Product } from "../../types/Product";
import { displayErrorFromServer } from "../../utils/errorHandlingUtils";

const replenishLocalStorageKey = "REPLENISH";

export default function Home() {
  const {
    data,
    error,
    updateProductsInLocalStorage,
    getProductsFromLocalstorage,
    removeProductsFromLocalStorage,
  } = useProducts(replenishLocalStorageKey);
  const [productSearch, setProductSearch] = React.useState<string>("");
  const [stockCounts, setStockCounts] = React.useState<ProductStockCount[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    if (data) {
      const dataFromLocalStorage = getProductsFromLocalstorage();
      if (dataFromLocalStorage.length === 0) {
        updateProductsInLocalStorage(data.products);
        setProducts(data.products);
      } else {
        const combinedData: Product[] = dataFromLocalStorage.map(
          (productFromLS: Product) => {
            const productFromSvr: Product = data.products.find(
              (p: Product) => p.salesItemId == productFromLS.salesItemId
            );
            if (productFromSvr) {
              return {
                ...productFromLS,
                expectedAmount: productFromSvr.expectedAmount,
              };
            } else {
              return productFromLS;
            }
          }
        );
        updateProductsInLocalStorage(combinedData);
        setProducts(combinedData);
      }
    }
  }, [data]);

  if (error) {
    return <div>Error... :(</div>;
  }
  if (!data) {
    return <Loader />;
  }

  const onReplenishStock = () => {
    const productsThatHaveBeenReplenished: ProductStockCount[] =
      getProductsFromLocalstorage()
        .filter((p) => p.replenishAmount)
        .map((p) => {
          return {
            stockCount: p.replenishAmount! + (p.expectedAmount ?? 0),
            productId: p.salesItemId,
            deviceId: p.deviceId,
            salesAreaId: 1,
            product: p,
          };
        });

    setStockCounts(productsThatHaveBeenReplenished);
    setIsSubmitting(true);
  };

  const submitStockCounts = async () => {
    const response = await postStockcount(stockCounts, getToken()!);
    if (response.status !== 200) {
      const result = await response.json();
      displayErrorFromServer(result);
    } else {
      notifySuccess("Successfully created stock counts");
      removeProductsFromLocalStorage();
      setIsSubmitting(false);
      navigate(-1);
    }
  };

  const replenishStock = (productId: number, replenishedAmount: number) => {
    setProducts((_products) => {
      const updatedProducts = _products.map((p) => {
        if (p.salesItemId === productId) {
          p.replenishAmount = replenishedAmount;
        }

        return p;
      });

      updateProductsInLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const undoReplenished = (productId: number) => {
    setProducts((_products) => {
      const updatedProducts = _products.map((p) => {
        if (p.salesItemId === productId) {
          p.replenishAmount = undefined;
        }

        return p;
      });

      updateProductsInLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const productItems = products.map((product, i) => {
    if (
      product.name
        .trim()
        .toLowerCase()
        .indexOf(productSearch.trim().toLowerCase()) !== -1
    ) {
      return (
        <ReplenishStockItem
          key={product.salesItemId}
          product={product}
          replenishStock={replenishStock}
          undoReplenishedAmount={undoReplenished}
        />
      );
    }
  });

  return (
    <>
      <ProductFilter
        productSearch={productSearch}
        setProductSearch={(updatedProductSearch) =>
          setProductSearch(updatedProductSearch)
        }
      />
      {isSubmitting ? (
        <StockCountSummary
          onCancel={() => {
            setIsSubmitting(false);
          }}
          onSubmit={submitStockCounts}
          stockCounts={stockCounts}
          productSearch={productSearch}
        />
      ) : (
        <>
          <ul>{productItems}</ul>
          <StickyButton onClick={onReplenishStock} />
        </>
      )}
    </>
  );
}
