import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards
} from '../utils/constants.js';

const popupWidthImage = new PopupWithImage(".popup_type_img");

const popupWithFormEdit = new PopupWithForm(".popup_type_edit", (event) => {
  event.preventDefault();
  const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"});
  userInfo.setUserInfo({
    newName: popupWithFormEdit._getInputValues().firstField, 
    newAbout: popupWithFormEdit._getInputValues().secondField});
  popupWithFormEdit.close();
});

const popupWithFormAdd = new PopupWithForm(".popup_type_add", (event) => {
  event.preventDefault();

  const place = new Section({items: [{name: popupWithFormAdd._getInputValues().firstField, link: popupWithFormAdd._getInputValues().secondField}], 
    renderer: (item) => {
      place.addItem(
        createCard(item.name, item.link), false);
    }
  }, ".elements");

  place.renderItems();
  popupWithFormAdd.close();
});

popupWidthImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditFormElementName = popupEdit.querySelector(".popup__input_first");
const popupEditFormElementAbout = popupEdit.querySelector(".popup__input_second");
const popupEditForm = popupEdit.querySelector(".popup__form");

const popupAdd = document.querySelector(".popup_type_add");
const popupAddFormElementTitle = popupAdd.querySelector(".popup__input_first");
const popupAddFormElementLink = popupAdd.querySelector(".popup__input_second");
const popupAddFormElementSaveButton = popupAdd.querySelector(".popup__save-button");
const popupAddForm = popupAdd.querySelector(".popup__form");

function createCard(name, title){
  const card = new Card(name, title, openPicture, "#picture-template");
  return card.createCard();
}

function saveChangesInProfile(event) {
  event.preventDefault();
  const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"});
  userInfo.setUserInfo({
    newName: popupEditFormElementName.value, 
    newAbout: popupEditFormElementAbout.value});
  closePopup(popupEdit);
}

function addNewPlace(event) {
  event.preventDefault();

  const place = new Section({items: [{name: popupAddFormElementTitle.value, link: popupAddFormElementLink.value}], 
    renderer: (item) => {
      place.addItem(
        createCard(item.name, item.link), false);
    }
  }, ".elements");

  place.renderItems();
  closePopup(popupAdd);
  popupAddForm.reset();
  popupAddFormElementSaveButton.setAttribute("disabled", "disabled");
  popupAddFormElementSaveButton.classList.add("popup__save-button_inactive");
  /*Возврат кнопки к начальному состоянию после добавления нового места*/
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeAnyPopupOnEscapeKeydown); //установка слушателя закрытие popup на Esc
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeAnyPopupOnEscapeKeydown); //снятие слушателя закрытие popup на Esc
}

function closeAnyPopupOnEscapeKeydown(event) {
  const openedPopup = document.querySelector(".popup_opened");
  if (event.key === "Escape" && openedPopup != null) 
    closePopup(openedPopup);
}

function openPicture(event) {
  popupWidthImage.open(event.target.src, event.target.alt);
}

const openProfileEditor = () => {
  const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"});
  popupEditFormElementName.value = userInfo.getUserInfo().profileName;
  popupEditFormElementAbout.value = userInfo.getUserInfo().profileAbout;
  popupEditFormElementName.dispatchEvent(new Event("input"));
  popupEditFormElementAbout.dispatchEvent(new Event("input"));
  /*dispatchEvent нужен для имитации события input, а следовательно
  запуска checkInputValidity и toggleButtonState из validate в том случае,
  если была стёрта строка имени либо описания и попап был закрыт. При следующем
  открытии попапа поля будут снова заполены данными профиля, но без события input
  валидатор посчитает это как за пустое поле на предыдущем шаге и будут высвечены ошибки,
  заблокирована кнопка до тех пор, по не будет произведён ввод каких-либо значений
  с клавиатуры, либо стирание символа.*/
  return openPopup(popupEdit);
};
const openPlaceEditor = () => popupWithFormAdd.open();

const initalPlaces = new Section({items: initialCards, 
  renderer: (item) => {
    initalPlaces.addItem(
      createCard(item.name, item.link));
  }
}, ".elements");

initalPlaces.renderItems();

const popupFormsList = Array.from(document.querySelectorAll(".popup__form"));
popupFormsList.forEach((popupForm) => {
  const validator = new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__save-button_inactive",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__input-error_active",
    },
    popupForm
  );
  validator.enableValidation();
});

profileAddButton.addEventListener("click", openPlaceEditor);
profileEditButton.addEventListener("click", openProfileEditor);