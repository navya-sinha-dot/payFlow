import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../lib/utils";

export const fetchNotifications = async (token) => {
  const res = await fetch(`${BACKEND_URL_PROD}/account/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
};
