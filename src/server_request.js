import axios from "axios";
const KEY = `33212863-d1b6547963e87b60c0036ca60`;
const MAIN_URL = `https://pixabay.com/api/`;

export async function serverRequest(customRequest, page) {
    const fulUrl = `${MAIN_URL}?key=${KEY}&q=${customRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
    const responce = await axios.get(fulUrl)
    const data = responce.data
    
    return data
}