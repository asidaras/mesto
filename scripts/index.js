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

const popupImage = document.querySelector('.popup_type_img');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

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

function createCard(pictureName, pictureLink) {
  const pictureTemplate = document.querySelector('#picture-template').content;
  const pictureElement = pictureTemplate.querySelector('.elements__element').cloneNode(true);

  const pictureElementImage = pictureElement.querySelector('.elements__image');

  pictureElementImage.src = pictureLink;
  pictureElementImage.alt = pictureName;
  pictureElement.querySelector('.elements__title').textContent = pictureName;

  pictureElement.querySelector('.elements__like').addEventListener('click', likePicture);
  pictureElement.querySelector('.elements__remove').addEventListener('click', deletePicture);
  pictureElement.querySelector('.elements__image-container').addEventListener('click', openPicture);

  return pictureElement;
}

function addCard(card, prepend=false){
  if (prepend === false){
    pictureContainer.append(card);
  }
  else
    pictureContainer.prepend(card);
}

function saveChangesInProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupEditFormElementName.value;
  profileAbout.textContent = popupEditFormElementAbout.value;
  closePopup(popupEdit);
}

function addNewPlace(evt){
  evt.preventDefault();
  addCard(createCard(popupAddFormElementTitle.value, popupAddFormElementLink.value), true);
  closePopup(popupAdd);
}

function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}

function likePicture(evt){
  evt.target.classList.toggle('elements__like_active');
}

function deletePicture(evt){
  evt.target.parentNode.remove();
}

function openPicture(evt){
  const popupImageImg = popupImage.querySelector('.popup__image');
  popupImageImg.src = evt.target.src;
  popupImageImg.alt = evt.target.alt;
  popupImage.querySelector('.popup__figcaption').textContent = evt.target.alt;
  openPopup(popupImage);
}

initialCards.forEach(function(item){
  addCard(createCard(item.name, item.link));
});

popupEditFormElementName.value = profileName.textContent;
popupEditFormElementAbout.value = profileAbout.textContent;

profileAddButton.addEventListener('click', () => openPopup(popupAdd));
profileEditButton.addEventListener('click', () => openPopup(popupEdit));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit', saveChangesInProfile);
popupAddForm.addEventListener('submit', addNewPlace);