import React, { useEffect } from "react";
import { Product } from "../../types/Product";
import Button, { ButtonVariant } from "../Button";
import CustomNumberFormContainer from "../CustomNumberFormContainer";
import Item from "../Item";

interface ReplenishStockItemProps {
  product: Product;
  replenishStock: (productId: number, replenishAmount: number) => void;
  undoReplenishedAmount: (productId: number) => void;
}

export default function ReplenishStockItem({
  product,
  replenishStock,
  undoReplenishedAmount,
}: ReplenishStockItemProps) {
  const [isEntertingReplenishAmount, setIsEnteringReplenishAmount] =
    React.useState(false);
  const [replenishAmount, setReplenishAmount] = React.useState("0");
  const [status, setStatus] = React.useState<string>("idle");

  const handleReplenishStock = async () => {
    const replenishAmountParsed = parseInt(replenishAmount);
    setStatus("loading");
    replenishStock(product.salesItemId, replenishAmountParsed);
    setStatus("complete");
    setReplenishAmount("0");
    setIsEnteringReplenishAmount(false);
  };

  if (isEntertingReplenishAmount) {
    return (
      <CustomNumberFormContainer
        label="Number of items added"
        onSubmit={handleReplenishStock}
        amount={replenishAmount}
        onCancel={() => {
          setReplenishAmount("");
          setIsEnteringReplenishAmount(false);
        }}
        setAmount={(amount: string) => setReplenishAmount(amount)}
        submitBtnTxt={status === "loading" ? "Submitting..." : "Submit"}
        status={status}
      />
    );
  }

  let itemStyles = { border: "", text: "", successIcon: "", failIcon: "" };
  if (product.replenishAmount !== undefined) {
    itemStyles = {
      border: "border-success",
      text: "text-success",
      successIcon: "text-4xl text-success",
      failIcon: "",
    };
  }

  const handleOnDeleteStockCount = () =>
    undoReplenishedAmount(product.salesItemId);
  console.log(product.replenishAmount);
  return (
    <li>
      <Item className={`mb-5 ${itemStyles.border} relative`}>
        <div>
          <p className={`mb-3 ${itemStyles.text}`}>{product.name}</p>
          {product.replenishAmount !== undefined && (
            <>
              <p className={itemStyles.text}>
                {" "}
                Replenished : {product.replenishAmount}
              </p>
            </>
          )}
        </div>
        {product.replenishAmount !== undefined && (
          <Button
            type="button"
            variant={ButtonVariant.SecondaryAndSmall}
            className="mt-2"
            onClick={handleOnDeleteStockCount}
          >
            Undo
          </Button>
        )}
        {product.replenishAmount === undefined && (
          <div>
            <Button
              variant={ButtonVariant.Secondary}
              type="button"
              className={itemStyles.text}
              onClick={() => {
                setIsEnteringReplenishAmount(true);
              }}
            >
              Replenish
            </Button>
          </div>
        )}
      </Item>
    </li>
  );
}
