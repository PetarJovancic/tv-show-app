export const getData = async (api, query) => {
  const res = await fetch(api + query);
  const data = await res.json();
  // console.log(data);
  return data;
};
