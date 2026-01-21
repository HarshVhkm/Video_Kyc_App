
import  apiFetch  from "./http";

export const fetchDashboardData = (range) => {
  return apiFetch(`/work-dashboard?filter=${range}`);
};
