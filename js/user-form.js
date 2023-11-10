const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload__form');
const closeOverlayButton = document.querySelector('.img-upload__cancel');
const hashtagInput = pictureUploadForm.querySelector('.text__hashtags');
const commentInput = pictureUploadForm.querySelector('.text__description');
const pristine = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isTextFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closePictureUploadForm();
  }
};

const openPictureUploadForm = () => {
  pictureUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeOverlayButton.addEventListener('click', closePictureUploadForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closePictureUploadForm () {
  pictureUploadForm.reset();
  pristine.reset();
  pictureUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureUploadInput.value = '';
  document.removeEventListener('keydown',onDocumentKeydown);
}

pictureUploadInput.addEventListener('change', openPictureUploadForm);

const normalizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateHashtagSymbols = (value) => normalizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateHashtagCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUniqueness = (value) => {
  const hashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  pictureUploadForm.querySelector('.text__hashtags'),
  validateHashtagSymbols,
  'введён невалидный хэш-тег',
);

pristine.addValidator(
  pictureUploadForm.querySelector('.text__hashtags'),
  validateHashtagCount,
  'превышено количество хэш-тегов',
);

pristine.addValidator(
  pictureUploadForm.querySelector('.text__hashtags'),
  validateHashtagUniqueness,
  'хэш-теги повторяются',
);

pristine.addValidator(
  pictureUploadForm.querySelector('.text__description'),
  validateDescriptionLength,
  'длина комментария больше 140 символов'
);

pictureUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
