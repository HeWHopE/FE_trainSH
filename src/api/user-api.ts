import { UserModel } from "@/models/user.model";
import { API_URL, LOCAL_STORAGE_TOKEN } from "../../api";

export const getCurrentUser = async (): Promise<UserModel> => {
  const response = await fetch(`${API_URL}/auth/currentUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
          : null
      }`,
    },
  });

  return await response.json();
};
