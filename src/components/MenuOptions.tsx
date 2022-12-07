import {
  faCalculator,
  faHandPaper,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { EngineerMenuOption } from "../types/EngineerMenuOption";
import EngineerMenuOptionItem from "./EngineerMenuOptionItem";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Button, { ButtonVariant } from "./Button";
import { useNavigate, useParams } from "react-router-dom";

const initialState = [
  {
    name: "Stock count",
    pathname: "/LiteStockManagement/{deviceId}/StockCount",
    parsedName: "stockcount",
    icon: faCalculator,
  },
  {
    name: "Replenish stock",
    pathname: "/LiteStockManagement/{deviceId}/ReplenishStock",
    parsedName: "replenishstock",
    icon: faHandPaper,
  },
  {
    name: "Wastage",
    pathname: "/LiteStockManagement/{deviceId}/Wastage",
    parsedName: "wastage",
    icon: faTrashCan,
  },
];

const engineerMenuOptions: EngineerMenuOption[] = initialState;

export default function MenuOptions() {
  useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return <h1>Error... please choose another device</h1>;

  const newArr = engineerMenuOptions.slice();
  const engineerMenu = newArr.map((menuOption, i) => {
    const mappedMenuOption = {
      ...menuOption,
      pathname: menuOption.pathname.replace("{deviceId}", id.toString()),
    };
    return <EngineerMenuOptionItem key={i} menuOption={mappedMenuOption} />;
  });

  return (
    <section>
      <div className="mb-3">
        <Button
          variant={ButtonVariant.SecondaryAndSmall}
          type="button"
          onClick={() => navigate("/")}
        >
          Choose another device
        </Button>
      </div>
      {engineerMenu}
    </section>
  );
}
