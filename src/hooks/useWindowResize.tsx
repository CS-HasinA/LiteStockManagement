import React from "react";

export default function useWindowResize() {
  const [currentWindowInnerWidth, setCurrentWindowInnerWidth] =
    React.useState<number>();

  React.useLayoutEffect(() => {
    const resizeList = () => setCurrentWindowInnerWidth(window.innerWidth);
    window.addEventListener("resize", resizeList);
    resizeList();

    return () => {
      window.removeEventListener("resize", resizeList);
    };
  }, []);

  React.useEffect(() => {
    console.log("Widsth changed");
    console.log(currentWindowInnerWidth);
  }, [currentWindowInnerWidth]);

  return [currentWindowInnerWidth];
}
