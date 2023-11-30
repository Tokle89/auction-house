export const getQueryParamId = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  return id;
};
