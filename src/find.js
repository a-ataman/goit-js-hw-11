import './css/style.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onLoad } from './api-pixabay';
import { message } from './massage';
import { scroll } from './scroll';

const inputForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
export const btnMore = document.querySelector('.load-more');
btnMore.addEventListener('click', addButton);
inputForm.addEventListener('submit', onSearch);

let qwest = '';
let page = 1;
btnMore.classList.add('is-hidden');

 function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  showImg(e.target.searchQuery.value, page);
  btnMore.classList.add("is-hidden");
  if (!e.currentTarget.elements.searchQuery.value) {
    return Notiflix.Notify.failure(
      `❌ "Sorry, there are no images matching your search query. Please try again."`
    );
  }
}

async function showImg(qwery, page) {
  qwest = qwery;
  btnMore.classList.add("is-hidden");
  try {
    const data = await onLoad(qwery, page);
    renderImages(data);
    if (page > 1) {
      scroll();
    }
  } catch (error) {
    console.log(error);
  }
  galleryList.refresh();
}

function renderImages(data) {
  const { totalHits, hits } = data.data;
  message(page, hits, totalHits);

  const markup = data.data.hits
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<div class="photo-card">
  <a href="${largeImageURL}" class="gallery__item"><img onclick="return false"; src="${webformatURL}" alt="${tags}" class="gallery__image"  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function addButton() {
  page += 1;
  btnMore.classList.remove("is-hidden");
  showImg(qwest, page);
}

let galleryList = new SimpleLightbox('div.gallery a', {
  captionsData: 'alt',
  captionDelay: 500,
});