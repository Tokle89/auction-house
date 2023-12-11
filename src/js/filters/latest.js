/**
 *  Sorts an array of objects by their created date.
 * @param {array} array
 * @returns
 * @example
 * //Example usage:
 * sortArrayByCreated(array);
 */
export const sortArrayByCreated = (array) => {
  return array.sort((a, b) => b.created - a.created);
};
