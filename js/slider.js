const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const filterList = document.querySelector('.effects__list');
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

const effects = {
  chrome : {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },

  sepia : {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },

  marvin : {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },

  heat : {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },

  phobos : {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },

  none : {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 2,
  },
  start: 1,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function updateEffectSlider (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    const effectValue = evt.target.value;
    updateSlider(effects[effectValue].min, effects[effectValue].max, effects[effectValue].start, effects[effectValue].step);
    if (effectValue === 'none') {
      sliderElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
    }
  }
}

//функция обновления слайдера
function updateSlider(min, max, start, step) {

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
}

// Обновление слайдера => обновление value в поле => изменение стиля фотографии

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  if (selectedEffect === 'chrome') {
    picturePreview.style.filter = `grayscale(${  valueElement.value })`;
    picturePreview.className = 'effects__preview--chrome';
  }
  if (selectedEffect === 'sepia') {
    picturePreview.style.filter = `sepia(${  valueElement.value })`;
    picturePreview.className = 'effects__preview--sepia';
  }
  if (selectedEffect === 'marvin') {
    picturePreview.style.filter = `invert(${  valueElement.value }%)`;
    picturePreview.className = 'effects__preview--marvin';
  }
  if (selectedEffect === 'phobos') {
    picturePreview.style.filter = `blur(${  valueElement.value }px)`;
    picturePreview.className = 'effects__preview--phobos';
  }
  if (selectedEffect === 'heat') {
    picturePreview.style.filter = `brightness(${  valueElement.value })`;
    picturePreview.className = 'effects__preview--heat';
  }
  if (selectedEffect === 'none') {
    picturePreview.style.filter = 'none';
    picturePreview.removeAttribute('class');
  }
});

export {filterList, updateEffectSlider};

