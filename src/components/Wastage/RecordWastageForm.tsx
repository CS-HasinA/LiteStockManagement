import React from "react";
import { faArrowLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WastageReason } from "../../types/WasteageReason";
import Button, { ButtonVariant } from "../Button";
import Input from "../Input";
import Item from "../Item";
import { Product } from "../../types/Product";
import AddNewWastageReasonForm from "./AddNewWastageReasonForm";
import useWastageReasons from "../../hooks/useWastageReasons";
import Loader from "../Loader";
import useAuth from "../../hooks/useAuth";
import { notifyFailure, notifySuccess } from "../../utils/toastUtils";
import WastageReasonSelectList from "./WastageReasonSelectList";
import { displayErrorFromServer } from "../../utils/errorHandlingUtils";

interface RecordWastageFormProps {
  product: Product;
  onCancel: () => void;
  onSubmit: () => void;
}

interface RecordWastageFormElements {
  productid: { value: string };
  wastagereason: { value: string };
  quantitywasted: { value: string };
}

interface RecordWastageFormError {
  wastagereasonid?: string;
  quantitywasted?: string;
}

interface Wastage {
  productId: number;
  deviceId: number;
  salesAreaId: number;
  quantityWasted: number;
  wastageReason: WastageReason;
}

export default function RecordWastageForm({
  product,
  onCancel,
  onSubmit,
}: RecordWastageFormProps) {
  const { getToken } = useAuth();
  const {
    wastageReasons,
    setWastageReasons,
    isLoading,
    isError,
    mutate,
    wastageReasonEndpoint,
  } = useWastageReasons();

  const [selectedWastageReason, setSelectedWastageReason] =
    React.useState<string>("");

  const [wastageReasonFilter, setWastageReasonFilter] =
    React.useState<string>("");
  const [error, setError] = React.useState<RecordWastageFormError>({});
  const [
    isShowingAddNewWastageReasonForm,
    setIsShowingAddNewWastageReasonForm,
  ] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   checkWastageReasonListSelectedItem(selectedWastageReason);
  // }, [selectedWastageReason]);

  const validateQuantityWasted = (valueToValidate: string): string => {
    const parsedValue = parseInt(valueToValidate);

    if (isNaN(parsedValue)) {
      return "Must be a valid number";
    } else if (parsedValue <= 0) {
      return "Quantity must be over 0";
    }

    return "";
  };

  const validateSelectedWastageReason = (valueToValidate: string): string => {
    if (valueToValidate === "") {
      return "Please add a wastage reason";
    }

    if (valueToValidate.length > 55) {
      return "Wastage reason must be less than 55 characters long";
    }

    return "";
  };

  const validateSelectListItem = (valueSelected: string): string => {
    const parsedValue = parseInt(valueSelected);
    if (isNaN(parsedValue)) {
      return "Please select an option ";
    }

    return "";
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RecordWastageFormElements;
    const formError: RecordWastageFormError = {
      quantitywasted: validateQuantityWasted(target.quantitywasted.value),
      wastagereasonid: validateSelectedWastageReason(selectedWastageReason),
    };
    if (formError.wastagereasonid || formError.quantitywasted) {
      setError(formError);
    } else {
      let wastageReason: WastageReason | undefined = wastageReasons.find(
        (x) => x.wastageReason === target.wastagereason.value
      );
      if (!wastageReason) {
        wastageReason = {
          wastageReason: target.wastagereason.value,
        };
      }

      const wastage: Wastage = {
        productId: product.salesItemId,
        deviceId: product.deviceId,
        salesAreaId: 1,
        quantityWasted: parseInt(target.quantitywasted.value),
        wastageReason,
      };

      const wastageJson = JSON.stringify(wastage);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/wastage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()!}`,
          "Content-Type": "application/json",
        },
        body: wastageJson,
      });

      if (response.status !== 200) {
        const data = await response.json();
        notifyFailure(`Error: ${data.error}`);
      } else {
        const data = (await response.json()) as {
          error: string;
          wastageReason: WastageReason;
          wastage: Wastage;
        };
        setWastageReasons((cur) => [...cur, data.wastageReason]);
        notifySuccess("Wastage saved");
        onSubmit();
      }
    }
  };

  const deleteWastageReason = async (
    wastageReasonId: string | number
  ): Promise<boolean> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/wastagereason`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wastageReasonId: wastageReasonId }),
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      setWastageReasons((cur) => cur.filter((wr) => wr.id != wastageReasonId));
      notifySuccess("Deleted wastage reason");
      return true;
    } else if (response.status === 400) {
      notifyFailure(result);
      return false;
    }

    return false;
  };

  const updateWastageReason = async (
    updatedWastageReason: WastageReason
  ): Promise<boolean> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/wastagereason`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWastageReason),
      }
    );

    if (response.status !== 200) {
      const result = await response.json();
      displayErrorFromServer(result);
      return false;
    } else {
      setWastageReasons((cur) =>
        cur.map((wr) =>
          wr.id === updatedWastageReason.id
            ? ((wr.wastageReason = updatedWastageReason.wastageReason), wr)
            : wr
        )
      );
      notifySuccess("Successfully updated wastage reason");
      return true;
    }
  };

  const checkQuantityWastedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((_error) => ({
      ..._error,
      quantitywasted: validateQuantityWasted(e.target.value),
    }));
  };

  const checkWastageReasonListSelectedItem = (value: string) => {
    setError((_error) => ({
      ..._error,
      wastagereasonid: validateSelectedWastageReason(value),
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Erroring... :(</h1>;
  }

  if (isShowingAddNewWastageReasonForm) {
    return (
      <AddNewWastageReasonForm
        onCancel={() => setIsShowingAddNewWastageReasonForm(false)}
        onSubmit={(newWastageReason) => {
          setWastageReasons((currReasons) => [
            ...currReasons,
            newWastageReason,
          ]);
        }}
      />
    );
  } else {
    return (
      <Item className="relative mb-5">
        <Button
          type="button"
          variant={ButtonVariant.Icon}
          className={"absolute left-6"}
          onClick={onCancel}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-2xl"
          ></FontAwesomeIcon>
        </Button>
        <h1 className="mb-5">Record a wastage</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <h2>Recording a wastage for {product.name}</h2>
          </div>
          <WastageReasonSelectList
            wastageReasonFilter={wastageReasonFilter}
            setWastageReasonFilter={setWastageReasonFilter}
            setSelectedWastageReason={setSelectedWastageReason}
            selectedWastageReason={selectedWastageReason}
            error={error.wastagereasonid}
            wastageReasons={wastageReasons}
            deleteWastageReason={deleteWastageReason}
            updateWastageReason={updateWastageReason}
            updateErrorMsg={checkWastageReasonListSelectedItem}
          />
          <div className="mb-4 relative"></div>
          <div className="mb-6">
            <label htmlFor="quantitywasted" className="mb-2 block text-left">
              Quantity wasted
            </label>
            <Input
              onChange={checkQuantityWastedInput}
              onBlur={checkQuantityWastedInput}
              type="number"
              id="quantitywasted"
              error={error.quantitywasted}
            />
          </div>
          <div>
            <Button type="submit" variant={ButtonVariant.Primary}>
              Save
            </Button>
          </div>
        </form>
      </Item>
    );
  }
}
