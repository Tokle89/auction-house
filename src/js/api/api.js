export const apiCall = async (url, fetchOptions) => {
  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();

    console.log(result);
    if (response.ok) {
      return result;
    } else return response;
  } catch (error) {
    console.log(error);
  }
};
