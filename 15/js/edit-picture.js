const ScaleInfo = {
  DEFAULT_SCALE: 100,
  MINIMAL_SCALE: 25,
  MAX_SCALE: 100,
  STEP: 25
};
const imgUpload = document.querySelector('.img-upload');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const imgPreview = imgUpload.querySelector('.img-upload__preview img');
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevel = imgUpload.querySelector('.effect-level__value');
const effectsContainer = imgUpload.querySelector('.effects__list');
const sliderContainer = imgUpload.querySelector('.img-upload__effect-level');
const effectInfo = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
  none: {
    effect: 'none',
    min: 1,
    max: 100,
    step: 1,
  },
};

/**
 * Функция проверяет масштаб изображения и уменьшает его если масштаб больше минимального разрешенного.
 */
const getSmallerPicture = () => {
  const oldScale = parseInt(scaleControlValue.value, 10);
  if (oldScale > ScaleInfo.MINIMAL_SCALE) {
    const newScale = oldScale - ScaleInfo.STEP;
    imgPreview.style.transform = `scale(${newScale / 100})`;
    scaleControlValue.value = `${newScale}%`;
  }
};

/**
 * Функция проверяет масштаб изображения и увеличивает его если масштаб меньше максимального разрешенного.
 */
const getBiggerPicture = () => {
  const oldScale = parseInt(scaleControlValue.value, 10);
  if (oldScale < ScaleInfo.MAX_SCALE) {
    const newScale = oldScale + ScaleInfo.STEP;
    imgPreview.style.transform = `scale(${newScale / 100})`;
    scaleControlValue.value = `${newScale}%`;
  }
};

/**
 * Функция сбрасывает масштаб изображения.
 */
const resetScale = () => {
  imgPreview.style.transform = `scale(${ScaleInfo.DEFAULT_SCALE / 100})`;
  scaleControlValue.value = `${ScaleInfo.DEFAULT_SCALE}%`;
};

/**
 * Функция добавляет обработчики событий на клик кнопок увеличения и уменьшения масштаба.
 */
const initScale = () => {
  scaleControlSmaller.addEventListener('click', getSmallerPicture);
  scaleControlBigger.addEventListener('click', getBiggerPicture);
};

let currentEffect = Object.keys(effectInfo)[5];

/**
 * Функция записывает значение интенсивности эффекта со слайдера в скрытое поле и накладывает эффект на изображение.
 */
const updateEffectOnPicture = () => {
  const currentEffectLevel = effectLevelSlider.noUiSlider.get();
  effectLevel.value = currentEffectLevel;
  if (effectInfo[currentEffect].unit) {
    imgPreview.style.filter = `${effectInfo[currentEffect].effect}(${currentEffectLevel}${effectInfo[currentEffect].unit})`;
  } else {
    imgPreview.style.filter = `${effectInfo[currentEffect].effect}(${currentEffectLevel})`;
  }
};

/**
 * Функция создает слайдер под изображением.
 * @param {number} min - минимальное значение слайдера.
 * @param {number} max - максимальное значение слайдера.
 * @param {number} step - шаг слайдера.
 */
const createEffectSlider = ({min, max, step}) => {
  noUiSlider.create(effectLevelSlider, {
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', updateEffectOnPicture);
};

/**
 * Функция обновляет данные слайдера.
 * @param {number} min - минимальное значение слайдера.
 * @param {number} max - максимальное значение слайдера.
 * @param {number} step - шаг слайдера.
 */
const updateEffectSlider = ({min, max, step}) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });
};

/**
 * Функция обработчика событий, которая обновляет слайдер в зависимости от выбранного эффекта для изображения.
 */
const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    currentEffect = evt.target.value;
  }
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = null;
    return;
  }
  updateEffectSlider(effectInfo[currentEffect]);
  sliderContainer.classList.remove('hidden');
};

/**
 * Функция инициализирует добавление эффектов на изображение.
 */
const initEffectOptions = () => {
  sliderContainer.classList.add('hidden');
  createEffectSlider(effectInfo[currentEffect]);
  effectsContainer.addEventListener('click', onEffectChange);
};

/**
 * Функция сбрасывает эффекты по умолчанию.
 */
const removeEffects = () => {
  currentEffect = Object.keys(effectInfo)[5];
  updateEffectSlider(effectInfo[currentEffect]);
  imgPreview.style.filter = null;
  sliderContainer.classList.add('hidden');
};

export {initEffectOptions, removeEffects, resetScale, initScale};
