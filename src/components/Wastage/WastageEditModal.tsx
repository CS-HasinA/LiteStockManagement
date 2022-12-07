import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Button, { ButtonVariant } from "../Button";
import Input from "../Input";

const customStyles = {
  overlay: {
    zIndex: "100000",
  },
  content: {
    height: "230px",
    padding: 0,
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

interface WastageEditModalProps {
  closeModal: () => void;
  updateWastageReason: (newWastageReason: string) => Promise<boolean>;
  getWastageReasonToEdit: () => string;
  isOpen: boolean;
}
export default function WastageEditModal({
  closeModal,
  isOpen,
  updateWastageReason,
  getWastageReasonToEdit,
}: WastageEditModalProps) {
  const ref = React.useCallback((node: HTMLInputElement) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const [error, setError] = React.useState("");

  const validateWastageReason = (wastageReason: string) => {
    if (wastageReason === "") {
      setError("Wastage reason cannot be empty");
      return false;
    }

    if (wastageReason.length >= 55) {
      setError("Wastage reason must be under 55 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as typeof e.target & {
      newwastagereason: { value: string };
    };
    const isValid = validateWastageReason(target.newwastagereason.value);
    if (!isValid) {
      return;
    }
    const succeeded = await updateWastageReason(target.newwastagereason.value);
    if (succeeded) {
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-lightgray h-12 flex items-center justify-center">
          <Button
            type="button"
            variant={ButtonVariant.Icon}
            className={"absolute left-6 top-3"}
            onClick={closeModal}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-2xl"
            ></FontAwesomeIcon>
          </Button>
          <h1>Update wastage reason</h1>
        </div>
        <div className="p-5">
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label id="newwastagereason" className="mb-2 block">
                New wastage reason
              </label>
              <Input
                type="text"
                id="newwastagereason"
                ref={ref}
                defaultValue={getWastageReasonToEdit()}
                onBlur={(e) => validateWastageReason(e.target.value)}
                onChange={(e) => validateWastageReason(e.target.value)}
                error={error}
              />
            </div>
            <Button
              variant={ButtonVariant.Primary}
              type="submit"
              id="wastageEditModalSubmitBtn"
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
