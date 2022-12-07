import React from "react";
import { Product } from "../../types/Product";
import Button, { ButtonVariant } from "../Button";
import Item from "../Item";
import RecordWastageForm from "./RecordWastageForm";

interface WastageItemProps {
  product: Product;
}

export default function WastageItems({ product }: WastageItemProps) {
  const [isShowingRecordWastageForm, setIsShowingRecordWastageForm] =
    React.useState<boolean>(false);

  const onSubmitWastage = () => {
    setIsShowingRecordWastageForm(false);
  };

  if (isShowingRecordWastageForm) {
    return (
      <RecordWastageForm
        product={product}
        onCancel={() => setIsShowingRecordWastageForm(false)}
        onSubmit={onSubmitWastage}
      />
    );
  } else {
    return (
      <Item className={`mb-5 `}>
        <div className="">
          <h3 className={`mb-3 `}>{product.name}</h3>
          <Button
            variant={ButtonVariant.Secondary}
            type="button"
            onClick={() => setIsShowingRecordWastageForm(true)}
          >
            Record waste
          </Button>
        </div>
      </Item>
    );
  }
}
