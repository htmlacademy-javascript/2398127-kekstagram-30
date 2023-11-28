import { createThumbnails } from './thumbnails.js';
import { debounce, getRandomArrayElement } from './util.js';
const RANDOM_PICTURES_COUNT = 10;
const picturesFilterContainer = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');
const picturesUploadForm = document.querySelector('.img-upload');
const pictureFilterForm = document.querySelector('.img-filters__form');
const filterButtons = pictureFilterForm.querySelectorAll('.img-filters__button');

/**
 * Функция создает массив и наполняет его элементами переданного в функцию массива в случайном порядке
 * @param {Array} data - массив с данными фотографий
 * @returns массив из заданного количества случайных элементов переданного в функцию массива
 */
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

/**
 * Функция создает копию массива и сортирует его по количеству комментариев
 * @param {Array} data - массив с данными фотографий
 * @returns копия массива, отсортированная по уменьшению количества комментариев
 */
const sortPicturesByCommentsCount = (data) => {
  const picturesByCommentsCount = data.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
  return picturesByCommentsCount;
};

/**
 * Функция очищает контейнер фотографий
 */
const clearPictures = () => {
  picturesContainer.innerHTML = '';
  picturesContainer.append(picturesUploadForm);
};

/**
 * Функция обработчика событий клика по кнопке фильтрации фотографий.
 * @param {*} picturesData - массив с данными фотографий
 */
const onFilterChange = (evt, picturesData) => {
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
};

const debouncedOnFilterChange = debounce(onFilterChange);

/**
 * Функция инициализирует возможность фильтрации фотографий
 */
const initPicturesFilters = (picturesData) => {
  createThumbnails(picturesData);
  picturesFilterContainer.classList.remove('img-filters--inactive');
  pictureFilterForm.addEventListener('click', (evt) => {
    filterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    debouncedOnFilterChange(evt, picturesData);
  });
};

export {initPicturesFilters};
