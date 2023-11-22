import {isEscapeKey} from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const commentsCount = bigPictureElement.querySelector('.social__comment-shown-count');
/**
 * Функция берет данные из массива, содержащего объекты с данными комментариев и выводит комментарии в окне с большим изображением.
 * @param {array} commentsData - массив с объектами комментариев к изображениям.
 */
const showBigPictureComments = (commentsData) => {
  //commentsData.forEach((commentData) => {
  for (let i = 0; i < commentsData.length; i++) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    if (i >= 5) {
      comment.classList.add('hidden');
    }
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = commentsData[i].avatar;
    commentAvatar.alt = commentsData[i].name;
    commentAvatar.style.width = '35px';
    commentAvatar.style.height = '35px';
    comment.appendChild(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = commentsData[i].message;
    comment.appendChild(commentText);

    commentsContainer.appendChild(comment);
  }
  if (commentsData.length < 5) {
    commentsCount.textContent = commentsData.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsCount.textContent = 5;
    commentsLoader.classList.remove('hidden');
  }
};

const showMoreComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  if (hiddenComments.length > 5) {
    for (let i = 0; i < 5; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    commentsCount.textContent = parseInt(commentsCount.textContent, 10) + 5;
  } else {
    for (let i = 0; i < hiddenComments.length; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    commentsCount.textContent = parseInt(commentsCount.textContent, 10) + hiddenComments.length;
    commentsLoader.classList.add('hidden');
  }
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
  commentsLoader.addEventListener('click', showMoreComments);
  openBigPicture();
};

export {showBigPictureInfo};
