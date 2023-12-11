/**
 *  Sorts an array by the ending date of objects in the array.
 * @param {array} array
 * @returns  {array} - The sorted array.
 * @example
 * //Example usage:
 * sortArrayByEnding(array);
 */

export const sortArrayByEnding = (array) => {
  return array.sort((a, b) => {
    const dateA = new Date(a.endsAt);
    const dateB = new Date(b.endsAt);
    return dateA - dateB;
  });
};
