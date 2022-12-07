import { useEffect, useState } from "react";
import useSWR from "swr";
import { Device } from "../types/Device";

const getDevices = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
    }),
  }).then((res) => res.json());

export default function useDevices() {
  const deviceEndpoint = `${process.env.REACT_APP_API_URL}/device`;

  const { data, error, mutate } = useSWR(deviceEndpoint, getDevices, {
    revalidateOnFocus: true,
  });

  const [devices, setDevices] = useState<Device[]>(data ? data : []);

  useEffect(() => {
    if (data) {
      setDevices(data);
    }
  }, [data]);

  return {
    devices: devices,
    isLoading: !error && !data,
    isError: Boolean(error),
    error: error,
    mutate,
  };
}
