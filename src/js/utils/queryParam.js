/**
 *  Get the query param that matches the argument from the url.
 * @param {string} arg
 * @returns  {string} - The query param that matches the argument.
 * @example
 * //Example usage:
 * getQueryParamId("id");
 * returns "1"
 */
export const getQueryParamId = (arg) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(`${arg}`);
  return value;
};
