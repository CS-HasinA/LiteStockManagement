import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Item from "./Item";
import { useState } from "react";
import Loader from "./Loader";
import useDevices from "../hooks/useDevices";
import ProductFilter from "./ProductFilter";

export default function Home() {
  useAuth();
  const [deviceSearch, setDeviceSearch] = useState("");
  const { devices, isLoading, isError, mutate } = useDevices();
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Error... Please try again later</h1>;
  }

  const items = devices
    .filter(
      (d) =>
        d.name
          .trim()
          .toLowerCase()
          .indexOf(deviceSearch.trim().toLowerCase()) !== -1
    )
    .map((device) => (
      <Link
        to={`/LiteStockManagement/${device.id}`}
        className="w-100"
        key={device.id}
      >
        <Item className="mb-3">{device.name}</Item>
      </Link>
    ));

  const deviceSearchInp = () => {
    return (
      <ProductFilter
        productSearch={deviceSearch}
        setProductSearch={setDeviceSearch}
        placeholder="Find a device by name"
      />
    );
  };

  return (
    <>
      <div>{deviceSearchInp()}</div>
      <div>{items}</div>
    </>
  );
}
