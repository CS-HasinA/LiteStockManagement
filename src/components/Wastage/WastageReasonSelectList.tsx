import React from "react";
import useWindowResize from "../../hooks/useWindowResize";
import { WastageReasonSelectListItem } from "../../types/WastageReasonSelectListItem";
import { WastageReason } from "../../types/WasteageReason";
import Input from "../Input";
import WastageEditModal from "./WastageEditModal";
import WastageReasonListItem from "./WastageReasonListItem";

interface CustomSelectProps {
  setWastageReasonFilter: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWastageReason: React.Dispatch<React.SetStateAction<string>>;
  error: string | undefined;
  selectedWastageReason: string;
  wastageReasonFilter: string;
  wastageReasons: WastageReason[];
  deleteWastageReason: (wastageReasonId: number | string) => Promise<boolean>;
  updateWastageReason: (
    updatedWastageReason: WastageReason
  ) => Promise<boolean>;
  updateErrorMsg: (wastageReason: string) => void;
}
export default function WastageReasonSelectList({
  setWastageReasonFilter,
  setSelectedWastageReason,
  deleteWastageReason,
  updateWastageReason,
  updateErrorMsg,
  selectedWastageReason,
  error,
  wastageReasonFilter,
  wastageReasons,
}: CustomSelectProps) {
  const [isShowingDropdown, setIsShowingDropdown] =
    React.useState<boolean>(false);

  const [wastageReasonSelectList, setWastageReasonSelectList] = React.useState<
    WastageReasonSelectListItem[]
  >([]);

  const [wastageReasonCurrentlyEditing, setWastageReasonCurrentlyEditing] =
    React.useState<WastageReasonSelectListItem>();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectListWidth, setSelectListWisth] = React.useState<number>();
  const [currentWindowInnerWidth] = useWindowResize();

  const selectListInputRef = React.useCallback(
    (node: HTMLInputElement) => {
      if (node !== null) {
        setSelectListWisth(node.clientWidth);
      }
    },
    [currentWindowInnerWidth]
  );

  let filteredState: WastageReasonSelectListItem[] = [];

  const createWastageReasonSelectList = () => {
    setWastageReasonSelectList(
      wastageReasons.map((wr) => ({
        key: wr.id!,
        value: wr.wastageReason,
        selected: false,
      }))
    );
  };

  const updateWastageReasonSelectList = () => {
    setWastageReasonSelectList((curList) => {
      return wastageReasons.map((wr) => {
        const wrslitem = curList.find((x) => wr.id! === x.key);
        if (wrslitem) {
          return {
            key: wrslitem.key!,
            value: wr.wastageReason,
            selected: wrslitem.selected,
          };
        } else {
          return { key: wr.id!, value: wr.wastageReason, selected: false };
        }
      });
    });
  };

  React.useEffect(() => {
    const isWastageReasonSelectListNotInitializedYet =
      wastageReasonSelectList.length === 0;

    if (isWastageReasonSelectListNotInitializedYet) {
      createWastageReasonSelectList();
    } else {
      updateWastageReasonSelectList();
    }
  }, [wastageReasons]);

  React.useEffect(() => {
    if (wastageReasonSelectList.length > 0) {
      const wastageReasonListItem = wastageReasonSelectList.find(
        (x) => x.selected
      );
      if (wastageReasonListItem) {
        const wastageReason = wastageReasons.find(
          (x) => x.id === wastageReasonListItem.key
        );
        if (wastageReason) {
          setSelectedWastageReason(wastageReason.wastageReason);
          updateErrorMsg(wastageReason.wastageReason);
        }
      }
    }
  }, [wastageReasonSelectList]);

  React.useLayoutEffect(() => {
    document.querySelector("body")?.addEventListener("click", function (e) {
      const target = e.target as typeof e.target & {
        id: string;
      };
      if (
        target.id !== "wastagereason" &&
        target.id !== "wastageEditModalSubmitBtn"
      ) {
        setIsShowingDropdown(false);
      }
    });
  }, []);

  const handleSpecialSelectItemClick = (
    wastageReason: WastageReasonSelectListItem
  ) => {
    setWastageReasonSelectList((cur) => {
      return cur.map((wr) => {
        if (wr.key === wastageReason.key) {
          wr.selected = true;
        } else {
          wr.selected = false;
        }

        return wr;
      });
    });
  };

  const handleDeleteWastageReason = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    wastageReason: WastageReasonSelectListItem
  ) => {
    e.stopPropagation();
    if (!wastageReason) {
      return;
    }

    const result: boolean = await deleteWastageReason(wastageReason.key);
    if (result && wastageReason.value === selectedWastageReason) {
      setSelectedWastageReason("");
    }
  };

  const handleEditWastageReason = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    wastageReason: WastageReasonSelectListItem
  ) => {
    e.stopPropagation();

    setWastageReasonCurrentlyEditing(wastageReason);
    setIsModalOpen(true);
  };

  const getWastageReasonToEdit = (): string =>
    wastageReasonCurrentlyEditing ? wastageReasonCurrentlyEditing.value : "";

  const wastageReasonLis = () => {
    filteredState = wastageReasonSelectList.filter(
      (wr) =>
        wr.value
          .trim()
          .toLowerCase()
          .indexOf(wastageReasonFilter.trim().toLowerCase()) !== -1
    );
    return filteredState.map((wastageReason) => (
      <WastageReasonListItem
        key={wastageReason.key}
        wastageReason={wastageReason}
        onClick={handleSpecialSelectItemClick}
        onEdit={handleEditWastageReason}
        onDelete={handleDeleteWastageReason}
      />
    ));
  };

  return (
    <div className="mb-4 text-left relative" style={{ zIndex: 1000 }}>
      <label className="mb-2 block text-left">Wastage Reason</label>
      <Input
        ref={selectListInputRef}
        onChange={(e) => {
          setWastageReasonFilter(e.target.value);
          setSelectedWastageReason(e.target.value);
          updateErrorMsg(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setSelectedWastageReason(filteredState[0].value);
            setIsShowingDropdown(false);
            setWastageReasonFilter("");
          }
        }}
        onClick={() => setIsShowingDropdown(true)}
        onBlur={(e) => updateErrorMsg(e.target.value)}
        type="text"
        id="wastagereason"
        value={selectedWastageReason}
        error={error}
      />
      {isShowingDropdown && (
        <ul
          className="bg-white absolute"
          style={{ width: selectListWidth, borderRadius: "4px" }}
        >
          {wastageReasonLis()}
        </ul>
      )}
      <WastageEditModal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          setWastageReasonCurrentlyEditing(undefined);
        }}
        getWastageReasonToEdit={getWastageReasonToEdit}
        updateWastageReason={async (
          newWastageReason: string
        ): Promise<boolean> => {
          return await updateWastageReason({
            id: wastageReasonCurrentlyEditing?.key,
            wastageReason: newWastageReason,
          });
        }}
      />
    </div>
  );
}
