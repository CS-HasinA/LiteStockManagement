import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { WastageReason } from "../../types/WasteageReason";
import { notifySuccess } from "../../utils/toastUtils";
import Button, { ButtonVariant } from "../Button";
import Input from "../Input";
import Item from "../Item";

interface AddNewWastageReasonFormProps {
  onCancel: () => void;
  onSubmit: (newWastageReason: WastageReason) => void;
}

interface AddNewWasteReasonFormElements {
  wastagereason: { value: string };
}

export default function AddNewWastageReasonForm({
  onCancel,
  onSubmit,
}: AddNewWastageReasonFormProps) {
  const { getToken } = useAuth();
  const [error, setError] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("idle");

  const checkWastageReasonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError("A reason is required");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & AddNewWasteReasonFormElements;
    if (!target.wastagereason.value) {
      setError("A reason is required");
    } else {
      setStatus("loading");
      const response = await saveWastageReason(target.wastagereason.value);
      setStatus("complete");
      if (response.ok) {
        const data = (await response.json()) as {
          error: string;
          wastageReason: WastageReason;
        };
        notifySuccess(
          `added wastage reason ${data.wastageReason.wastageReason}`
        );
        onSubmit(data.wastageReason);
      }
    }
  };

  const saveWastageReason = (wastageReason: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/wastagereason`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason: wastageReason }),
    });
  };

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
      <h1 className="mb-5">Add a wastage reason</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="wastagereason" className="mb-2 block text-left">
            Wastage reason
          </label>
          <Input
            type="text"
            id="wastagereason"
            onChange={checkWastageReasonInput}
            onBlur={checkWastageReasonInput}
            error={error}
          />
        </div>
        <div>
          <Button type="submit" variant={ButtonVariant.Primary}>
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Item>
  );
}
