/**
 * takes the date string and parses it to a readable date.
 * @param {string} date
 * @returns {string} - The parsed date.
 * @example
 * //Example usage:
 * parseDate("2021-04-20T12:00:00.000Z");
 * returns "4/20/2021"
 */
export const parseDate = (date) => {
  const parsedDate = new Date(date).toLocaleDateString();
  return parsedDate;
};
