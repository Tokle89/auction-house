import { fetchCredits } from "./fetchCredits.js";
import * as storage from "../../storage/index.js";

export const updateCredit = () => {
  const user = storage.get("user");

  if (user) {
    const user = storage.get("user");
    const credits = fetchCredits(user.name);
    user.credit = credits;
    storage.save("user", user);
  } else {
    return;
  }
};
