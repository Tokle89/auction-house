/**
 * Remove an item from local storage, where the key value  matches the given key.
 * @param {string} key
 * @returns {void}
 * @example
 * //Example usage:
 * storage.remove("token");
 */
export const remove = (key) => localStorage.removeItem(key);
