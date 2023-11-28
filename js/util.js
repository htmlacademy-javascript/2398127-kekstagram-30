const ERROR_TIME_ON_SCREEN = 3000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
const failedUploadTemplate = document.querySelector('#error').content.querySelector('.error');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const createUnicueIds = (min, max) => {
  const previousIds = [];
  return function () {
    let currentId = getRandomInt(min, max);
    if (previousIds.length >= (max - min + 1)) {
      return null;
    }
    while (previousIds.includes(currentId)) {
      currentId = getRandomInt(min, max);
    }
    previousIds.push(currentId);
    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.appendChild(dataError);
  setTimeout(() => {
    dataError.remove();
  }, ERROR_TIME_ON_SCREEN);

};
const showSuccessUpload = () => {
  const successUpload = successUploadTemplate.cloneNode(true);
  document.body.appendChild(successUpload);
  const successUploadCloseButton = successUpload.querySelector('.success__button');
  successUploadCloseButton.addEventListener('click', () => {
    successUpload.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successUpload.remove();
    }
  });
  document.addEventListener('click', () => {
    successUpload.remove();
  });
};

const showFailedUpload = () => {
  const failedUpload = failedUploadTemplate.cloneNode(true);
  document.body.appendChild(failedUpload);
  const failedUploadCloseButton = failedUpload.querySelector('.error__button');
  failedUploadCloseButton.addEventListener('click', () => {
    failedUpload.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      failedUpload.remove();
    }
  });
  document.addEventListener('click', () => {
    failedUpload.remove();
  });
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export {debounce, getRandomInt, createUnicueIds, getRandomArrayElement, isEscapeKey, showDataError, showSuccessUpload, showFailedUpload};
