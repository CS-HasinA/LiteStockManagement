export interface Product {
  salesItemId: number;
  deviceId: number;
  name: string;
  expectedAmount: number;
  hasExpectedAmount?: boolean;
  actualAmount?: number;
  counted: boolean;
  replenishAmount?: number;
}
