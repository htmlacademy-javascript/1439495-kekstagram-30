const fullPhoto = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const commentsList = fullPhoto.querySelector('.social__comments');

const renderComment = ({avatar, name, message}) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const renderComments = (comments) => {
  commentsList.innerHTML = '';

  comments.forEach((item) => {
    const comment = renderComment(item);
    commentsList.insertAdjacentHTML('beforeend', comment);
  });
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  fullPhoto.querySelector('img').src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.social__comment-shown-count').textContent = comments.length;
  fullPhoto.querySelector('.social__comment-total-count').textContent = comments.length;
  fullPhoto.querySelector('.social__caption').textContent = description;

  renderComments(comments);

  fullPhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullPhoto.querySelector('.comments-loader').classList.add('hidden');
};

const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');

  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeFullPhoto);
  document.removeEventListener('keydown', closeFullPhotoByEscape);
};

function closeFullPhotoByEscape (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
}

const openFullPhoto = (photo) => {
  renderFullPhoto(photo);

  document.body.classList.add('modal-open');
  fullPhoto.classList.remove('hidden');
  closeBtn.addEventListener('click', closeFullPhoto);
  document.addEventListener('keydown', closeFullPhotoByEscape);
};


export {openFullPhoto};
