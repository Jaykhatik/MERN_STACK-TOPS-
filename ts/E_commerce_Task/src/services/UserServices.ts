import { User } from "../types/user";
import { API } from "./api";
import { API_ROUTES } from "./api/routes";
import { getRequest } from "./apiMethods";

// ✅ get users
export const getUsers = async (): Promise<User[]> => {
  const res = await getRequest<{data:User[]}>(API, API_ROUTES.user);
  return res.data || [];
};