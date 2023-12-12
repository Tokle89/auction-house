import { fetchCredits } from "./fetchCredits.js";
import * as storage from "../../storage/index.js";

/**
 *  Updates the  user credit in local storage.
 * If the user is not logged in, the function returns.|
 * @returns {void}
 * @example
 * //Example usage:
 * updateCredit();
 *
 */
export const updateCredit = async () => {
  const user = storage.get("user");

  if (user) {
    const user = storage.get("user");
    const credit = await fetchCredits(user.name);
    user.credit = credit;
    storage.save("user", user);
  } else {
    return;
  }
};
