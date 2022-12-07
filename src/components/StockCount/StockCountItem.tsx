import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Product } from "../../types/Product";
import Button, { ButtonVariant } from "../Button";
import CustomNumberFormContainer from "../CustomNumberFormContainer";
import Item from "../Item";

interface StockCountItemProps {
  product: Product;
  confirmExpectedStockCount: (productInLiteChillerId: number) => void;
  confirmActualStockCount: (productId: number, actualAmount: number) => void;
  undoCounted: (productId: number) => void;
}

export default function StockCountItem({
  product,
  confirmExpectedStockCount,
  confirmActualStockCount,
  undoCounted,
}: StockCountItemProps) {
  const [isEntertingActualAmount, setIsEnteringActualAmount] =
    React.useState(false);
  const [actualAmount, setActualAmount] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  React.useState<boolean>();
  const [disableBtn, setDisableBtn] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const validate = (): string => {
    const parsedActualAmount = parseInt(actualAmount);
    if (isNaN(parsedActualAmount)) {
      return "Please enter a valid number";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (errors && errors.length) {
      const validationResult = validate();
      if (validationResult === "") {
        setErrors([]);
      }
    }
  }, [actualAmount]);

  const handleOnSubmitOfActualProductAmountForm = async () => {
    const validationResult = validate();
    if (validationResult !== "") {
      setErrors((_error) => [..._error, validationResult]);
      return;
    }

    const parsedAmount = parseInt(actualAmount);
    if (parsedAmount === product.expectedAmount) {
      confirmExpectedStockCount(product.salesItemId);
    } else {
      confirmActualStockCount(product.salesItemId, parsedAmount);
    }

    setStatus("complete");
    setIsEnteringActualAmount(false);
    setDisableBtn(true);
  };

  const handleOnConfirmExpectedStock = () => {
    setActualAmount("0");
    confirmExpectedStockCount(product.salesItemId);
  };

  const handleOnDeleteStockCount = () => {
    setActualAmount("0");
    undoCounted(product.salesItemId);
  };

  let itemStyles = { border: "", text: "", successIcon: "", failIcon: "" };
  if (product.counted) {
    if (product.hasExpectedAmount || product.expectedAmount === null) {
      itemStyles = {
        border: "border-success",
        text: "text-success",
        successIcon: "text-4xl text-success",
        failIcon: "",
      };
    } else if (product.hasExpectedAmount === false) {
      itemStyles = {
        border: "border-warning",
        text: "text-warning",
        successIcon: "",
        failIcon: "text-4xl text-warning",
      };
    }
  }

  const actualAmountForItem = () => {
    if (product.counted && product.hasExpectedAmount === false) {
      return (
        <p className={`${itemStyles.text} mb-4`}>
          Actual : {product.actualAmount}
        </p>
      );
    } else {
      return null;
    }
  };

  const stockCountButtons = () => {
    let confirmOrContradictBtns = () => {
      if (!product.counted) {
        return (
          <>
            <Button
              type="button"
              variant={ButtonVariant.Icon}
              className="mr-7 mt-5"
              onClick={handleOnConfirmExpectedStock}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-4xl  ${itemStyles.successIcon}`}
              ></FontAwesomeIcon>
            </Button>
            <Button
              variant={ButtonVariant.Icon}
              type="button"
              onClick={(e) => setIsEnteringActualAmount(true)}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                className={`text-4xl  ${itemStyles.failIcon}`}
              ></FontAwesomeIcon>
            </Button>
          </>
        );
      } else if (product.counted && product.hasExpectedAmount) {
        return (
          <div className="relative mt-5">
            <Button
              type="button"
              variant={ButtonVariant.Icon}
              onClick={handleOnConfirmExpectedStock}
              disabled={disableBtn}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-3xl  ${itemStyles.successIcon}`}
              ></FontAwesomeIcon>
            </Button>
          </div>
        );
      } else if (product.counted && product.hasExpectedAmount === false) {
        return (
          <div className="relative">
            <Button
              variant={ButtonVariant.Icon}
              type="button"
              onClick={() => {
                setIsEnteringActualAmount(true);
              }}
              disabled={disableBtn}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                className={`text-3xl  ${itemStyles.failIcon}`}
              ></FontAwesomeIcon>
            </Button>
          </div>
        );
      }
    };

    const createFirstStockCountButton = (
      <Button
        variant={ButtonVariant.Secondary}
        type="button"
        onClick={() => setIsEnteringActualAmount(true)}
      >
        Add the first stock count for this product
      </Button>
    );

    const editFirstStockCount = (
      <Button
        variant={ButtonVariant.Secondary}
        type="button"
        onClick={() => setIsEnteringActualAmount(true)}
      >
        Edit stock count
      </Button>
    );
    if (product.expectedAmount !== null) {
      return confirmOrContradictBtns();
    } else if (!product.counted && !product.expectedAmount) {
      return createFirstStockCountButton;
    } else if (product.counted && !product.expectedAmount) {
      return editFirstStockCount;
    }
  };

  const undoStockCount = () => {
    if (
      (product.counted && product.hasExpectedAmount === false) ||
      (product.counted && product.hasExpectedAmount)
    ) {
      return (
        <Button
          type="button"
          variant={ButtonVariant.SecondaryAndSmall}
          onClick={handleOnDeleteStockCount}
          className="mt-3"
        >
          Undo
        </Button>
      );
    } else {
      return null;
    }
  };

  if (isEntertingActualAmount) {
    return (
      <CustomNumberFormContainer
        label="Enter Stock Count"
        onSubmit={handleOnSubmitOfActualProductAmountForm}
        amount={actualAmount}
        onCancel={() => {
          setErrors([]);
          setActualAmount("");
          setIsEnteringActualAmount(false);
        }}
        setAmount={(actualAmount: string) => setActualAmount(actualAmount)}
        submitBtnTxt={status === "loading" ? "Submitting..." : "Submit"}
        status={status}
        errors={errors}
      />
    );
  }

  return (
    <li>
      <Item className={`mb-5 ${itemStyles.border}`}>
        <div>
          <p className={`text-xl ${itemStyles.text} mb-3`}>{product.name}</p>{" "}
          {product.expectedAmount !== null && (
            <p className={`${itemStyles.text} mb-2`}>
              <span>Expected :</span> {product.expectedAmount}
            </p>
          )}
          {actualAmountForItem()}
        </div>
        {stockCountButtons()}
        {undoStockCount()}
      </Item>
    </li>
  );
}
