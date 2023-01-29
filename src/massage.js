import Notiflix from 'notiflix';
import { btnMore, totalHits } from './find';

export function message(page, total, totalHits) {
  if (total.length < 40 && page > 1) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnMore.classList.add('is-hidden'); 
    if (page === 1 && total.length > 1) {
    if (total.length < 40) {
      btnMore.classList.add('is-hidden'); 

    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
  }
  if (page === 1 && total.length === 0 && totalHits === 0) {
    btnMore.classList.add('is-hidden'); 

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
