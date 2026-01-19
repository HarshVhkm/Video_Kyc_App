const BASE_URL = `http://localhost:5000/api/auth/` || "";

export const apiFetch = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    credentials: "include", // keep if using cookies / auth
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};
