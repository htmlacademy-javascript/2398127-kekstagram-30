import {isEscapeKey} from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentCount = bigPictureElement.querySelector('.social__comment-count');
const commentLoader = bigPictureElement.querySelector('.comments-loader');

/**
 * Функция берет данные из массива, содержащего объекты с данными комментариев и выводит комментарии в окне с большим изображением.
 * @param {array} commentsData - массив с объектами комментариев к изображениям.
 */

const showBigPictureComments = (commentsData) => {
  commentsData.forEach((commentData) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = commentData.avatar;
    commentAvatar.alt = commentData.name;
    commentAvatar.style.width = '35px';
    commentAvatar.style.height = '35px';
    comment.appendChild(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = commentData.message;
    comment.appendChild(commentText);

    commentsContainer.appendChild(comment);
  });
};

/**
 * Если нажат Escape, то вызывается функция, закрывающая большое изображение.
 */

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

/**
 * Функция закрывает большое изображение и удаляет обработчик событий клавиши Esc.
 */

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
  commentsContainer.innerHTML = '';
}

/**
 * Функция отображает большое изображение и добавляет обработчик событий на Esc и клик по кнопке закрытия.
 */

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.addEventListener('click', () => {
    closeBigPicture();
  });
};

/**
 * Функция берет данные из массива объектов с данными изображений и выводит их в окне большого изображения.
 * @param {array} picture - массив с данными изображений
 */

const showBigPictureInfo = (picture) => {
  bigPictureElement.querySelector('.big-picture__img > img').src = picture.url;
  bigPictureElement.querySelector('.big-picture__img').alt = picture.description;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  showBigPictureComments(picture.comments);
  openBigPicture();
};

export {showBigPictureInfo};
