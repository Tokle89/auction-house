import * as storage from "../../storage/index.js";
import * as url from "../../api/constant.js";
import { apiCall } from "../../api/api.js";

/**
 * Fetches the user credit from the API, and returns the credit.
 * @param {string} name
 * @returns {number} - The user credit.
 * @example
 * //Example usage:
 * const credit = await fetchCredits(user.name);
 * user.credit = credit;
 * storage.save("user", user);
 *
 */
export const fetchCredits = async (name) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  };

  try {
    const { credits } = await apiCall(
      url.BASE + url.PROFILE + `/${name}`,
      fetchOptions,
    );

    return credits;
  } catch (error) {
    alert(`oops, something went wrong: ${error}`);
  }
};
