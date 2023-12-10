export const get = (key) => {
  let item = JSON.parse(localStorage.getItem(key));
  return item;
};
