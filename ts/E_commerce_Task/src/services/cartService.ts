import { AxiosInstance } from "axios";
import { CART_PRODUCTS_API } from "./api";
import { API_ROUTES } from "./api/routes";
import { getRequest } from "./apiMethods";
import { Cart } from "../types/cart";
import { ProductType } from "../types/product";

// ✅ get carts
export const getCarts = (): Promise<Cart[]> => {
  return getRequest<Cart[]>(CART_PRODUCTS_API as AxiosInstance, API_ROUTES.cart)
    .then((data) => data || []);
};

// ✅ get products
export const getProducts = (): Promise<ProductType[]> => {
  return getRequest<ProductType[]>(CART_PRODUCTS_API as AxiosInstance, API_ROUTES.product)
    .then((data) => data || []);
};