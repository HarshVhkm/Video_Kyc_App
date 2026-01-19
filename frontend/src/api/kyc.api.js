import { apiFetch } from "./https";

export const getPastKycCalls = () => {
  return apiFetch("past");
};
