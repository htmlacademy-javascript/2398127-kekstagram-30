const imgUpload = document.querySelector('.img-upload');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const imgPreview = imgUpload.querySelector('.img-upload__preview img');
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValue = imgUpload.querySelector('.effect-level__value');
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

const scaleInfo = {
  DEFAULT_SCALE: 100,
  MINIMAL_SCALE: 25,
  MAX_SCALE: 100,
  STEP: 25
};

const getSmallerPicture = () => {
  const oldScale = parseInt(scaleControlValue.value, 10);
  if (oldScale >= 50) {
    const newScale = oldScale - scaleInfo.STEP;
    imgPreview.style.transform = `scale(${newScale / 100})`;
    scaleControlValue.value = `${newScale}%`;

  }
};

const getBiggerPicture = () => {
  const oldScale = parseInt(scaleControlValue.value, 10);
  if (oldScale <= 75) {
    const newScale = oldScale + scaleInfo.STEP;
    imgPreview.style.transform = `scale(${newScale / 100})`;
    scaleControlValue.value = `${newScale}%`;

  }
};

const resetScale = () => {
  imgPreview.style.transform = `scale(${scaleInfo.DEFAULT_SCALE / 100})`;
};

const initScaleButton = () => {
  scaleControlSmaller.addEventListener('click', getSmallerPicture);
  scaleControlBigger.addEventListener('click', getBiggerPicture);
};


let currentEffect = effectInfo.none;

const updateEffect = () => {
  const effectLevel = effectLevelSlider.noUiSlider.get();
  const effect = effectInfo.currentEffect;
  effectLevelValue.value = effectLevel;
  if (currentEffect.unit) {
    imgPreview.style.filter = `${effect}(${effectLevel}${currentEffect.unit})`;
  } else {
    imgPreview.style.filter = `${effect}(${effectLevel})`;
  }
};

const createEffectSlider = (effect) => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', updateEffect);
};

const updateEffectSlider = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  if (currentEffect === 'none') {
    //sliderContainer.classList.add('hidden');
    imgPreview.style.filter = null;
    return;
  }
  updateEffectSlider(effectInfo.currentEffect);
  sliderContainer.classList.remove('hidden');
};

const addEffectOptions = () => {
  //sliderContainer.classList.add('hidden');
  createEffectSlider(currentEffect);
  effectsContainer.addEventListener('click', onEffectChange);
};

addEffectOptions();


// noUiSlider.create(effectLevelSlider, {
//   range: {
//     min: 1,
//     max: 100,
//   },
//   start: 1,
//   step: 1,
//   connect: 'lower',
// });
