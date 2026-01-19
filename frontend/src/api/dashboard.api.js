
import { httpGet } from "./https";

export const fetchDashboardData = (range) => {
  return httpGet(`/work-dashboard?filter=${range}`);
};
