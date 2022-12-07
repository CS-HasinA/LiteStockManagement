import { Product } from "./Product";

export interface ProductStockCount {
  stockCount: number;
  productId: number;
  deviceId: number;
  salesAreaId: number;
  product?: Product;
  created?: Date;
  id?: number;
}
