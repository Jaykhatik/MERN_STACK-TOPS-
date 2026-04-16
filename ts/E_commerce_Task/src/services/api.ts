import { AxiosInstance } from "axios";
import { getAxiosInstance } from "./axiosConfig";

// ✅ Extract env variables
const USER_BASE_URL = import.meta.env.VITE_BASE_USER_URL as string;
const CART_BASE_URL = import.meta.env.VITE_BASE_CART_URL as string;

// ✅ Create instances with proper typing
const API: AxiosInstance = getAxiosInstance(USER_BASE_URL);
const CART_PRODUCTS_API: AxiosInstance = getAxiosInstance(CART_BASE_URL);

export { API, CART_PRODUCTS_API };