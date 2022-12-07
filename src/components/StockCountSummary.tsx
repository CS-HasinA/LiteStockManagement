import { ProductStockCount } from "../types/ProductStockCount";
import Button, { ButtonVariant } from "./Button";
import StockCountSummaryItem from "./StockCountSummaryItem";

interface StockCountSummaryProps {
  onCancel: () => void;
  onSubmit: () => void;
  stockCounts: ProductStockCount[];
  productSearch: string;
}

export default function StockCountSummary({
  onCancel,
  onSubmit,
  stockCounts,
  productSearch,
}: StockCountSummaryProps) {
  const stockCountSummaryItems = stockCounts.map((stockCount) => {
    if (
      stockCount
        .product!.name.trim()
        .toLowerCase()
        .indexOf(productSearch.trim().toLowerCase()) !== -1
    ) {
      return (
        <StockCountSummaryItem
          key={stockCount.productId}
          stockCount={stockCount}
        />
      );
    }
  });

  return (
    <div className="relative">
      <Button
        type="button"
        variant={ButtonVariant.Icon}
        className={"bg-white p-1 pl-3 pr-3 rounded absolute left-0 top-0"}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <div className="pt-10">
        <h1 className="text-xl text-left mb-4">
          Please confirm that you wish for stock counts to be created for these
          items
        </h1>
        <ul className="mb-5">{stockCountSummaryItems}</ul>
        <div className="sticky bottom-2 shadow-2xl">
          <Button
            variant={ButtonVariant.Primary}
            type="button"
            onClick={onSubmit}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
