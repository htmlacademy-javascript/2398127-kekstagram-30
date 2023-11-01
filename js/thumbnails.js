import {showBigPictureInfo} from './big-picture.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

const createThumbnails = (picturesData) => {
  picturesData.forEach((pictureData) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pictureData.url;
    pictureElement.querySelector('.picture__img').alt = pictureData.description;
    pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPictureInfo(pictureData);
    });

    picturesListFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesListFragment);
};

export {createThumbnails};
