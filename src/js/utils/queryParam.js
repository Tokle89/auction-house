export const getQueryParamId = (arg) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(`${arg}`);
  return value;
};
