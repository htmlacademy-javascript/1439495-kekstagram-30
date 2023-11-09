import {isEscapeKey} from './util.js';
import {changeSliderOptions as onEffectsClickHandler} from './slider.js';
import { sendData } from './server.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const form = document.querySelector('.img-upload__form');
const inputPhoto = form.querySelector('.img-upload__input');
const formToEditPhoto = form.querySelector('.img-upload__overlay');
const closeFormBtn = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const scaleInput = form.querySelector('.scale__control--value');

const effectsList = form.querySelector('.effects__list');
const image = form.querySelector('.img-upload__preview img');

const resetCloseByEscape = (evt) => evt.stopPropagation();

const regexpForHashtag = /^#[\wа-яё]{1,19}$/i;

const changeScale = (factor = 1) => {
  let newValue = parseInt(scaleInput.value, 10);
  newValue = newValue + Zoom.STEP * factor;
  if (newValue > Zoom.MAX) {
    newValue = Zoom.MAX;
  }
  if (newValue < Zoom.MIN) {
    newValue = Zoom.MIN;
  }
  scaleInput.value = `${newValue}%`;
  image.style.transform = `scale(${newValue / 100})`;
};

const onScaleBtnClick = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller')) {
    changeScale(-1);
  }
  if(evt.target.classList.contains('scale__control--bigger')) {
    changeScale();
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);
  hashtagInput.removeEventListener('keydown', resetCloseByEscape);
  commentInput.removeEventListener('keydown', resetCloseByEscape);
  effectsList.removeEventListener('click', onEffectsClickHandler);
  form.querySelector('.img-upload__scale').removeEventListener('click', onScaleBtnClick);

  image.style.removeProperty('transform');
  image.style.removeProperty('filter');
  form.reset();
  pristine.reset();
};

function closeFormByEscape (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  closeFormBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
  hashtagInput.addEventListener('keydown', resetCloseByEscape);
  commentInput.addEventListener('keydown', resetCloseByEscape);
  effectsList.addEventListener('click', onEffectsClickHandler);
  form.querySelector('.img-upload__scale').addEventListener('click', onScaleBtnClick);
};

inputPhoto.addEventListener('change', openForm);

const validateHashtag = (value) => {
  const hashtagArr = value.toLowerCase().trim().split(/\s+/);

  return !(hashtagArr.find((item) => !regexpForHashtag.test(item))) &&
        !(hashtagArr.length > MAX_HASHTAGS) &&
        (new Set(hashtagArr).size === hashtagArr.length);
};

const getHashtagErrorMessage = () => {
  const hashtagArr = hashtagInput.value.toLowerCase().trim().split(/\s+/);

  if (hashtagArr.find((item) => !regexpForHashtag.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (hashtagArr.length > MAX_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (new Set(hashtagArr).size !== hashtagArr.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const data = new FormData(form);
    form.querySelector('.img-upload__submit').disabled = true;
    sendData(data, closeForm, closeFormByEscape);
    form.querySelector('.img-upload__submit').disabled = false;
  }
});
