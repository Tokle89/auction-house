/**
 * Trims text to a specified length by slicing the text and adding "..." to the end.
 * @param {string} text
 * @param {number} length
 * @returns {string}
 * @example
 * //Example usage:
 * trimText("Hello World", 5);
 * returns "Hello..."
 */
export const trimText = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};
