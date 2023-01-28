import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '11765026-ad058062c9714826adefbf756';

export async function onLoad(searchQuery, page) {
  const responce = await axios.get(
    `${BASE_URL}?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return responce;
}
