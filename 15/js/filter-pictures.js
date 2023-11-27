import { createThumbnails } from './thumbnails.js';
import { getRandomArrayElement } from './util.js';
const RANDOM_PICTURES_COUNT = 10;

const picturesFilterContainer = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');
const picturesUploadForm = document.querySelector('.img-upload');
const pictureFilterForm = document.querySelector('.img-filters__form');
const filterButtons = pictureFilterForm.querySelectorAll('.img-filters__button');

const getRandomPictures = (data) => {
  const randomPictures = [];
  while (randomPictures.length < RANDOM_PICTURES_COUNT) {
    const picture = getRandomArrayElement(data);
    if (!randomPictures.includes(picture)) {
      randomPictures.push(picture);
    }
  }
  return randomPictures;
};

const sortPicturesByCommentsCount = (data) => {
  const picturesByCommentsCount = data.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
  return picturesByCommentsCount;
};

const clearPictures = () => {
  picturesContainer.innerHTML = '';
  picturesContainer.append(picturesUploadForm);
};

const initPicturesFilters = (picturesData) => {
  picturesFilterContainer.classList.remove('img-filters--inactive');
  createThumbnails(picturesData);

  pictureFilterForm.addEventListener('click', (evt) => {
    filterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    clearPictures();
    if (evt.target.id === 'filter-default') {
      createThumbnails(picturesData);
    }
    if (evt.target.id === 'filter-random') {
      createThumbnails(getRandomPictures(picturesData));
    }
    if (evt.target.id === 'filter-discussed') {
      createThumbnails(sortPicturesByCommentsCount(picturesData));
    }
  });
};

export {initPicturesFilters};
