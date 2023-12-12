/**
 * Get an item from local storage, where the key value matches the given key.
 * Parses the item from JSON to an object, and returns the object.
 * @param {string} key
 * @returns  {object} - The item from local storage.
 * @example
 * //Example usage:
 * storage.get("token");
 */

export const get = (key) => {
  let item = JSON.parse(localStorage.getItem(key));
  return item;
};
