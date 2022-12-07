import CustomNumberForm from "./CustomNumberForm";
import Item from "./Item";

interface CustomNumberFormContainerProps {
  onSubmit: () => void;
  onCancel: () => void;
  amount: string;
  setAmount: (num: string) => void;
  label: string;
  submitBtnTxt?: string;
  status?: string;
  errors?: string[];
}

export default function CustomNumberFormContainer({
  onSubmit,
  onCancel,
  amount,
  setAmount,
  label,
  submitBtnTxt,
  status,
  errors,
}: CustomNumberFormContainerProps) {
  const handleActualAmountChange = (event: any) => {
    const value = event.target.value;
    const parsedValue = value < "0" && value !== "" ? "0" : value;

    setAmount(parsedValue);
  };

  const increment = () =>
    amount === ""
      ? setAmount("0")
      : setAmount((parseInt(amount) + 1).toString());

  const decrement = () =>
    amount === "" || amount === "0"
      ? setAmount("0")
      : setAmount((parseInt(amount) - 1).toString());

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="mb-4">
      <Item>
        <CustomNumberForm
          increment={increment}
          decrement={decrement}
          onCancel={onCancel}
          handleSubmit={handleSubmit}
          handleActualAmountChange={handleActualAmountChange}
          submitBtnTxt={submitBtnTxt}
          label={label}
          amount={amount}
          disabled={status === "loading"}
          errors={errors}
        />
      </Item>
    </div>
  );
}
