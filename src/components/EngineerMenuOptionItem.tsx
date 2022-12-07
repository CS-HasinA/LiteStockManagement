import { EngineerMenuOption } from "../types/EngineerMenuOption";
import { Product } from "../types/Product";
import { ProductStockCount } from "../types/ProductStockCount";
import Item from "./Item";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressTracker from "./ProgressTracker";
import { useEffect } from "react";

interface EngineerMenuOptionProps {
  menuOption: EngineerMenuOption;
}

export default function EngineerMenuOptionItem({
  menuOption,
}: EngineerMenuOptionProps) {
  const products: Product[] = [];
  return (
    <Link to={menuOption.pathname}>
      <Item className="mb-5">
        <div className="mb-5">
          <FontAwesomeIcon
            icon={menuOption.icon}
            className="text-xl mb-4 text-gray-500"
          />
          <p className="text-xl">{menuOption.name}</p>
        </div>
        <div>
          {/* <ProgressTracker
              products={products}
              screen={menuOption.parsedName}
            /> */}
        </div>
      </Item>
    </Link>
  );
}
