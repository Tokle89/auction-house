import * as storage from "../storage/index.js";

/**
 * Removes the token and user data from the local storage when user logs out.
 */
export const handleLogout = () => {
  storage.remove("token");
  storage.remove("user");

  window.location.replace("../../../");
};
