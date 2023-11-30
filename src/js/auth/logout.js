import * as storage from "../storage/index.js";

export const handleLogout = () => {
  storage.remove("token");
  storage.remove("user");

  window.location.replace("../../../");
};
