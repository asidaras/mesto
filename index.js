let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let about = profile.querySelector('.profile__about');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let saveButton =  popup.querySelector('.popup__save-button');
let formElement;

function fillValue(){
  formElement = popup.querySelectorAll('.popup__input');
  formElement[0].value = name.textContent;
  formElement[1].value = about.textContent
}

function formSubmitHandler(evt){
  evt.preventDefault();
  formElement = popup.querySelectorAll('.popup__input');
  name.textContent = formElement[0].value;
  about.textContent = formElement[1].value;
  closePopup();
}

function openPopup(){
  fillValue();
  popup.classList.add('popup_opened');
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click',formSubmitHandler);