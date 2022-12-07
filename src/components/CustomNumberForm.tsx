import Button, { ButtonVariant } from "./Button";
import Error from "./Error";
import CustomNumberInput from "./CustomNumberInput";

export interface CustomNumberFormProps {
  handleSubmit?: (e: any) => void;
  onCancel?: () => void;
  amount: string;
  decrement: (e: any) => void;
  increment: (e: any) => void;
  label: string;
  submitBtnTxt?: string;
  handleActualAmountChange: (e: any) => void;
  disabled?: boolean;
  errors?: string[];
}

export default function CustomNumberForm({
  handleSubmit,
  label,
  decrement,
  amount,
  handleActualAmountChange,
  increment,
  submitBtnTxt,
  onCancel,
  disabled,
  errors,
}: CustomNumberFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      {errors && errors.length > 0 ? <Error errors={errors} /> : null}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="actualAmount"
      >
        {label}
      </label>
      <CustomNumberInput
        increment={increment}
        decrement={decrement}
        value={amount}
        onChange={handleActualAmountChange}
      />
      <div className="flex justify-around">
        {handleSubmit && (
          <Button
            type="submit"
            variant={ButtonVariant.Primary}
            className="mr-5"
            disabled={disabled}
          >
            {submitBtnTxt ? submitBtnTxt : "Submit"}
          </Button>
        )}

        {onCancel && (
          <Button
            type="button"
            variant={ButtonVariant.Secondary}
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
