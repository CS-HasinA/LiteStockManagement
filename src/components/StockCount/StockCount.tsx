import React, { useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import ProductFilter from "../ProductFilter";
import StockCountItem from "./StockCountItem";
import Loader from "../Loader";
import { ProductStockCount } from "../../types/ProductStockCount";
import useAuth from "../../hooks/useAuth";
import { notifyFailure, notifySuccess } from "../../utils/toastUtils";
import { Product } from "../../types/Product";
import StickyButton from "../StickyButton";
import StockCountSummary from "../StockCountSummary";
import { postStockcount } from "../../apiRequests/StockCount";
import { displayErrorFromServer } from "../../utils/errorHandlingUtils";

const localStorageKey = "STOCKCOUNT";

export default function StockCount() {
  const {
    data,
    getProductsFromLocalstorage,
    removeProductsFromLocalStorage,
    updateProductsInLocalStorage,
    error,
  } = useProducts(localStorageKey);

  const { getToken } = useAuth();

  const [productSearch, setProductSearch] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [stockCounts, setStockCounts] = React.useState<ProductStockCount[]>([]);
  const [productsInLiteChiller, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

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
    return <h1>{error}</h1>;
  }

  if (!data) {
    return <Loader />;
  }

  const confirmExpectedStock = (productId: number) =>
    setProducts((_products) => {
      const updatedProducts = _products.map((p) => {
        if (p.salesItemId === productId) {
          p.counted = true;
          p.hasExpectedAmount = true;
        }

        return p;
      });
      updateProductsInLocalStorage(updatedProducts);
      return updatedProducts;
    });

  const confirmActualAmount = (productId: number, actualAmount: number) =>
    setProducts((_products) => {
      const updatedProducts = _products.map((p) => {
        if (p.salesItemId === productId) {
          p.counted = true;
          p.hasExpectedAmount = p.expectedAmount === null;
          p.actualAmount = actualAmount;
        }

        return p;
      });

      updateProductsInLocalStorage(updatedProducts);
      return updatedProducts;
    });

  const undoCounted = (productId: number) => {
    setProducts((_products) => {
      const updatedProducts = _products.map((p) => {
        if (p.salesItemId === productId) {
          p.counted = false;
          p.hasExpectedAmount = undefined;
          p.actualAmount = undefined;
        }

        return p;
      });

      updateProductsInLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const submitStockCount = () => {
    const products: Product[] = getProductsFromLocalstorage();
    const stockCounts: ProductStockCount[] = products
      .filter((p) => p.counted)
      .map((p) => {
        let stockCount;
        if (
          p.actualAmount === undefined ||
          p.actualAmount === null ||
          p.actualAmount < 0
        ) {
          stockCount = p.expectedAmount;
        } else {
          stockCount = p.actualAmount;
        }

        return {
          stockCount,
          productId: p.salesItemId,
          deviceId: p.deviceId,
          salesAreaId: 1,
          product: p,
        };
      });

    setStockCounts(stockCounts);
    setIsSubmitting(true);
  };

  const confirmStockCountToSave = async () => {
    const response = await postStockcount(stockCounts, getToken()!);
    if (response.status !== 200) {
      const result = await response.json();
      displayErrorFromServer(result);
    } else {
      notifySuccess("Successfully completed stock count");

      setProducts((_products) =>
        _products.map(
          (p) => (
            (p.counted = false),
            (p.actualAmount = undefined),
            (p.hasExpectedAmount = undefined),
            p
          )
        )
      );
      setIsSubmitting(false);
      setStockCounts([]);
      removeProductsFromLocalStorage();
      navigate(-1);
    }
  };

  const cancelStockCountSummary = () => {
    setIsSubmitting(false);
    setStockCounts([]);
  };

  const productItems = () => {
    return productsInLiteChiller.map((product, i) => {
      if (
        product.name
          .trim()
          .toLowerCase()
          .indexOf(productSearch.trim().toLowerCase()) !== -1
      ) {
        return (
          <StockCountItem
            key={product.salesItemId}
            product={product}
            confirmExpectedStockCount={confirmExpectedStock}
            confirmActualStockCount={confirmActualAmount}
            undoCounted={undoCounted}
          />
        );
      }
    });
  };

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
          onCancel={cancelStockCountSummary}
          onSubmit={confirmStockCountToSave}
          stockCounts={stockCounts}
          productSearch={productSearch}
        />
      ) : (
        <>
          <ul>{productItems()}</ul>
          <StickyButton onClick={submitStockCount} />
        </>
      )}
    </>
  );
}
