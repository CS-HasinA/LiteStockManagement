import Button, { ButtonVariant } from "./Button";

interface StickyButtonProps {
  onClick: () => void;
}

export default function StickyButton({ onClick }: StickyButtonProps) {
  return (
    <div className="sticky bottom-2 shadow-2xl">
      <Button
        variant={ButtonVariant.Primary}
        type="button"
        onClick={onClick}
        className="shadow-2xl"
      >
        Submit
      </Button>
    </div>
  );
}
