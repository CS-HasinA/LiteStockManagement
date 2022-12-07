import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";

interface CustomNumberInput {
  decrement: (e: any) => void;
  increment: (e: any) => void;
  value: string;
  onChange: (event: any) => void;
}

export default function CustomNumberInput({
  decrement,
  increment,
  value,
  onChange,
}: CustomNumberInput) {
  return (
    <div className="flex mb-5">
      <button type="button" className="mr-6 flex-none" onClick={decrement}>
        <FontAwesomeIcon icon={faMinus} className="text-3xl"></FontAwesomeIcon>
      </button>
      <div className="flex-auto">
        <Input
          id="actualAmount"
          type="number"
          value={value}
          onChange={onChange}
        />
      </div>
      <button type="button" className="ml-6 flex-none" onClick={increment}>
        <FontAwesomeIcon icon={faPlus} className="text-3xl"></FontAwesomeIcon>
      </button>
    </div>
  );
}
