let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let about = profile.querySelector('.profile__about');
let editButton = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formElementName = popup.querySelector('.popup__input_type_name');
let formElementAbout = popup.querySelector('.popup__input_type_about');
let form = popup.querySelector('.popup__form');

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

function addPicture(pictureName, pictureLink) {
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
    popupImage.classList.add('popup-image_opened');
  });

  pictureContainer.append(pictureElement);
}

function formSubmitHandler(evt){
  evt.preventDefault();
  name.textContent = formElementName.value;
  about.textContent = formElementAbout.value;
  closePopup();
}

function openPopup(){
  formElementName.value = name.textContent;
  formElementAbout.value = about.textContent
  popup.classList.add('popup_opened');
}

function closeImagePopup(){
  popupImage.classList.remove('popup-image_opened');
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

initialCards.forEach(function(item) {
  addPicture(item.name, item.link);
});

popupImageCloseButton.addEventListener('click', closeImagePopup);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);