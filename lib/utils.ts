import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./redux/features/cart/cartSlice";
import crypto from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFromPrice(product: Product): number {
  const basePrice = Object.entries(product.priceConfiguration)
    .filter(([key, value]) => {
      return value.priceType === 'base';
    })
    .reduce((acc, [key, value]) => {
      const smallestPrice: number = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);
  return basePrice;
}

export const hashItem = (data: CartItem) => {

  const dataString = JSON.stringify({ ...data, qty: undefined });

  const hash = crypto.SHA256(dataString).toString();

  return hash;


}
