let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let about = profile.querySelector('.profile__about');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formElementName = popup.querySelector('.popup__input_type_name');
let formElementAbout = popup.querySelector('.popup__input_type_about');
let form = popup.querySelector('.popup__form');

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

function closePopup(){
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);