import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  profileEditButton,
  profileAddButton
} from '../utils/constants.js';

const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"}); //получение данных профиля

const popupWidthImage = new PopupWithImage(".popup_type_img"); //создание экземпляра класса попапа картинки

const popupWithFormEdit = new PopupWithForm(".popup_type_edit", (event) => { //создание экземпляра класса формы изменения данных профиля
  event.preventDefault();

  const {name, about} = popupWithFormEdit.getValues() //получение данных из формы ввода
  userInfo.setUserInfo({ //присвоение новых данных
    newName: name, 
    newAbout: about});
  popupWithFormEdit.close(); //закрытие попапа изменения данных профиля
});

const popupWithFormAdd = new PopupWithForm(".popup_type_add", (event) => { //создание экземпляра класса формы добавления нового места
  event.preventDefault();
  const {title, link} = popupWithFormAdd.getValues() //получение данных из формы ввода

  places.addItem(createCard(title, link), false);

  popupWithFormAdd.close(); //закрытие попапа добавления нового места
});

//установка слушателей событий
popupWidthImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

function createCard(name, title){ 
  const card = new Card(name, title, openPicture, "#picture-template");
  return card.createCard();
}

function openPicture(event) { //колбэк функция открытия большой картинки
  popupWidthImage.open(event.target.src, event.target.alt);
}

const openProfileEditor = () => {
  popupWithFormEdit.setInputValues({
    name: userInfo.getUserInfo().profileName,
    about: userInfo.getUserInfo().profileAbout
  });
  popupWithFormEdit.open();
};
const openPlaceEditor = () => popupWithFormAdd.open();

//инициалицая начальными карточками
const places = new Section({items: initialCards, 
  renderer: (item) => {
    places.addItem(
      createCard(item.name, item.link));
  }
}, ".elements");

places.renderItems();

//включение валидации
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