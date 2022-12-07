import { useEffect, useState } from "react";
import useSWR from "swr";
import { WastageReason } from "../types/WasteageReason";

const getWastageReasons = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
    }),
  }).then((res) => res.json());

export default function useWastageReasons() {
  const wastageReasonEndpoint = `${process.env.REACT_APP_API_URL}/wastagereason`;

  const { data, error, mutate } = useSWR(
    wastageReasonEndpoint,
    getWastageReasons,
    {
      revalidateOnFocus: false,
    }
  );

  const [wastageReasons, setWastageReasons] = useState<WastageReason[]>(
    data ? data : []
  );

  useEffect(() => {
    if (data) {
      setWastageReasons(data);
    }
  }, [data]);

  return {
    wastageReasons: wastageReasons,
    setWastageReasons: setWastageReasons,
    isLoading: !error && !data,
    isError: Boolean(error),
    error: error,
    mutate,
    wastageReasonEndpoint: wastageReasonEndpoint,
  };
}
