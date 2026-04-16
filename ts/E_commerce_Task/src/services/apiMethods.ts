import { AxiosInstance } from "axios";

export const getRequest = <T>(
  API: AxiosInstance,
  url: string
): Promise<T> => {
  return API.get(url)
    .then((res) => res.data as T) // ✅ just added type
    .catch((err) => {
  console.log("GET ERRORS", err);
  throw err;
});
};