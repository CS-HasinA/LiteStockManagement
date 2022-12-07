import { Product } from "../types/Product";

interface ProgressTrackerProps {
  products: Product[];
  screen: string;
}

export default function ProgressTracker({
  products,
  screen,
}: ProgressTrackerProps) {
  let countedProducts = [];
  return <h1>Progress tracker</h1>;
  // if (screen === "stockcount") {
  //   countedProducts = products.filter((product) => product.latestStockCount);
  // } else if (screen === "replenishstock") {
  //   countedProducts = products.filter((product) => product.latestStockCount);
  // }

  // let percentageLeft = 0;
  // if (countedProducts.length === 0) {
  //   return null;
  // } else if (countedProducts.length !== products.length) {
  //   percentageLeft = Math.round(
  //     ((products.length - (products.length - countedProducts.length)) /
  //       products.length) *
  //       100
  //   );
  //   return <p>In progress - {percentageLeft}% complete</p>;
  // } else {
  //   if (screen === "stockcount") {
  //     const productsThatHaveTheirExpectedAmount = products.filter((product) =>
  //       hasProductGotExpectedStockCount(product)
  //     );
  //     const productsThatDontHaveTheirExpectedAmount = products.filter(
  //       (product) => hasProductGotExpectedStockCount(product) === false
  //     );
  //     return (
  //       <div>
  //         <p>Stock count complete</p>
  //         <p>
  //           Complete products : {productsThatHaveTheirExpectedAmount.length}
  //         </p>
  //         <p>
  //           Missing products : {productsThatDontHaveTheirExpectedAmount.length}
  //         </p>
  //       </div>
  //     );
  //   } else if (screen === "replenishstock") {
  //     return <h1>Replenished stock</h1>;
  //   } else {
  //     return <h1>What</h1>;
  //   }
  // }
}
