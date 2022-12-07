import { faEdit, faTimesSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WastageReasonSelectListItem } from "../../types/WastageReasonSelectListItem";

interface WastageReasonListItemProps {
  wastageReason: WastageReasonSelectListItem;
  onClick: (wastageReason: WastageReasonSelectListItem) => void;
  onEdit: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    wastageReason: WastageReasonSelectListItem
  ) => void;
  onDelete: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    wastageReason: WastageReasonSelectListItem
  ) => void;
}

export default function WastageReasonListItem({
  wastageReason,
  onClick,
  onEdit,
  onDelete,
}: WastageReasonListItemProps) {
  const styles = "";
  return (
    <li
      key={wastageReason.key}
      className={`p-3 relative cursor-pointer ${styles}`}
      onClick={() => onClick(wastageReason)}
    >
      <span>{wastageReason.value}</span>
      <span
        className="absolute right-14 top-2.5 text-lightgray"
        onClick={(e) => onEdit(e, wastageReason)}
      >
        <FontAwesomeIcon icon={faEdit} className="text-2xl" />
      </span>
      <span
        className="absolute right-4 top-2.5 text-fail-light"
        onClick={(e) => onDelete(e, wastageReason)}
      >
        <FontAwesomeIcon icon={faTimesSquare} className="text-2xl" />
      </span>
    </li>
  );
}
