import axios, { AxiosInstance } from "axios";

export const getAxiosInstance = (baseURL: string): AxiosInstance => {
  if (!baseURL) {
    throw new Error("Base URL is missing. Check your .env file.");
  }

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};