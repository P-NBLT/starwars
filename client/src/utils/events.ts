import { apiClient } from "./apiClient";
import { Auth } from "./types";

export async function onAuthSubmit(
  email: string,
  password: string,
  type: Auth.LOGIN | Auth.REGISTER,
  username?: string
) {
  const response = await apiClient(`/auth/${type}`, {
    data: { username: email, password },
  });
  return true;
}
