const COMMENTS_COUNT_AT_ONCE = 5;

const fullPhoto = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const commentsList = fullPhoto.querySelector('.social__comments');
const loadBtn = fullPhoto.querySelector('.comments-loader');

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

const renderCurrentComments = (maxIndex, comments) => {
  let currentIndex = commentsList.children.length > 0 ? commentsList.children.length : 0;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    loadBtn.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    commentsList.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};

let loadCommentsOnBtn;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_COUNT_AT_ONCE;

  loadCommentsOnBtn = () => {
    renderCurrentComments(maxIndex, comments);
    fullPhoto.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_COUNT_AT_ONCE;
  };

  commentsList.innerHTML = '';
  loadBtn.classList.remove('hidden');

  loadCommentsOnBtn();

  loadBtn.addEventListener('click', loadCommentsOnBtn);
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  fullPhoto.querySelector('img').src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.social__comment-total-count').textContent = comments.length;
  fullPhoto.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const closeFullPhoto = () => {
  loadBtn.removeEventListener('click', loadCommentsOnBtn);
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
