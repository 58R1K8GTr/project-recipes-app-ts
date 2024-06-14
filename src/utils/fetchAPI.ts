async function fetchApi(url: string) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchApi;
