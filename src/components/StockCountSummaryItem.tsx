import { ProductStockCount } from "../types/ProductStockCount";
import Item from "./Item";

interface StockCountSummaryItemProps {
  stockCount: ProductStockCount;
}

export default function StockCountSummaryItem({
  stockCount,
}: StockCountSummaryItemProps) {
  let itemStyles = {
    border: "",
    text: "",
  };
  if (
    stockCount.product!.hasExpectedAmount ||
    !stockCount.product!.expectedAmount ||
    stockCount.product?.replenishAmount
  ) {
    itemStyles = {
      border: "border-success",
      text: "text-success",
    };
  } else if (stockCount.product!.hasExpectedAmount === false) {
    itemStyles = {
      border: "border-warning",
      text: "text-warning",
    };
  }
  return (
    <li key={stockCount.productId} className="mb-3">
      <Item className={`${itemStyles.border}`}>
        <p className={`${itemStyles.text} font-medium`}>
          {stockCount.product!.name}
        </p>
        {stockCount.product!.expectedAmount !== null &&
          stockCount.product!.hasExpectedAmount && (
            <>
              <p className={`${itemStyles.text}`}>
                Expected: {stockCount.product!.expectedAmount}
              </p>
            </>
          )}
        {stockCount.product!.expectedAmount !== null &&
          stockCount.product!.hasExpectedAmount === false && (
            <>
              <p className={`${itemStyles.text}`}>
                Expected: {stockCount.product!.expectedAmount}
              </p>
              <p className={`${itemStyles.text}`}>
                Actual: {stockCount.product!.actualAmount}
              </p>
            </>
          )}
        {stockCount.product!.expectedAmount === null &&
          stockCount.product!.actualAmount && (
            <p className={`${itemStyles.text}`}>
              Actual: {stockCount.product!.actualAmount}
            </p>
          )}
      </Item>
    </li>
  );
}
