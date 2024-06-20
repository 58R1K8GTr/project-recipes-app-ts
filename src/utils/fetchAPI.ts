async function fetchApi(url: string) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchApi;
