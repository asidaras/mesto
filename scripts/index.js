const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditFormElementName = popupEdit.querySelector('.popup__input_type_name');
const popupEditFormElementAbout = popupEdit.querySelector('.popup__input_type_about');
const popupEditForm = popupEdit.querySelector('.popup__form');

const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddFormElementTitle = popupAdd.querySelector('.popup__input_type_title');
const popupAddFormElementLink = popupAdd.querySelector('.popup__input_type_link');
const popupAddForm = popupAdd.querySelector('.popup__form');

const popupImage = document.querySelector('.popup-image');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-button');

const pictureContainer = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function addPicture(pictureName, pictureLink, prepend=false) {
  const pictureTemplate = document.querySelector('#picture-template').content;
  const pictureElement = pictureTemplate.querySelector('.elements__element').cloneNode(true);

  pictureElement.querySelector('.elements__image').src = pictureLink;
  pictureElement.querySelector('.elements__image').alt = pictureName;
  pictureElement.querySelector('.elements__title').textContent = pictureName;

  pictureElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  pictureElement.querySelector('.elements__remove').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });

  pictureElement.querySelector('.elements__image-container').addEventListener('click', function (evt) {
    popupImage.querySelector('.popup-image__img').src = evt.target.src;
    popupImage.querySelector('.popup-image__img').alt = evt.target.alt;
    popupImage.querySelector('.popup-image__figcaption').textContent = evt.target.alt;
    popupImage.classList.add('popup-image_opened');
  });

  console.log(pictureContainer);

  if (prepend === false){
    pictureContainer.append(pictureElement);
  }
  else
    pictureContainer.prepend(pictureElement);
}

function saveChangesInProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupEditFormElementName.value;
  profileAbout.textContent = popupEditFormElementAbout.value;
  closePopup('.popup_type_edit');
}

function addNewPlace(evt){
  evt.preventDefault();
  addPicture(popupAddFormElementTitle.value, popupAddFormElementLink.value, true);
  closePopup('.popup_type_add');
}

function openPopup(popupClassName){
  if (popupClassName.includes('type_edit')){
    popupEditFormElementName.value = profileName.textContent;
    popupEditFormElementAbout.value = profileAbout.textContent;
    popupEdit.classList.add('popup_opened');
  }
  if (popupClassName.includes('type_add')){
    popupAdd.classList.add('popup_opened');
  }
}

function closePopup(popupClassName){
  if (popupClassName.includes('type_edit')){
    popupEdit.classList.remove('popup_opened');
  }
  if (popupClassName.includes('type_add')){
    popupAdd.classList.remove('popup_opened');
  }
  if (popupClassName.includes('image')){
    popupImage.classList.remove('popup-image_opened');
  }
}

initialCards.forEach(function(item) {
  addPicture(item.name, item.link);
});

profileAddButton.addEventListener('click', () => openPopup('.popup_type_add'));
profileEditButton.addEventListener('click', () => openPopup('.popup_type_edit'));
popupImageCloseButton.addEventListener('click', () => closePopup('.popup-image'));
popupAddCloseButton.addEventListener('click', () => closePopup('.popup_type_add'));
popupEditCloseButton.addEventListener('click', () => closePopup('.popup_type_edit'));
popupEditForm.addEventListener('submit', saveChangesInProfile);
popupAddForm.addEventListener('submit', addNewPlace);