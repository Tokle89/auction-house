import { fetchCredits } from "./fetchCredits.js";
import * as storage from "../../storage/index.js";

export const updateCredit = async () => {
  const user = storage.get("user");

  if (user) {
    const user = storage.get("user");
    const credit = await fetchCredits(user.name);
    user.credit = credit;
    console.log(user);
    storage.save("user", user);
  } else {
    return;
  }
};
