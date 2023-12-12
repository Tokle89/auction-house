/**
 *  Stringify and save the value to localStorage
 * @param {string} key
 * @param {object} value
 * @returns {void}
 * @example
 * //Example usage:
 * storage.save("token", "1234");
 */
export const save = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
