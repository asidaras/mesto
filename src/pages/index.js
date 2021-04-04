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

const popupWidthImage = new PopupWithImage(".popup_type_img"); //создание экземпляра класса попапа картинки

const popupWithFormEdit = new PopupWithForm(".popup_type_edit", (event) => { //создание экземпляра класса формы изменения данных профиля
  event.preventDefault();
  const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"}); //получение данных профиля

  const {firstValue, secondValue} = popupWithFormEdit.getValues() //получение данных из формы ввода
  userInfo.setUserInfo({ //присвоение новых данных
    newName: firstValue, 
    newAbout: secondValue});
  popupWithFormEdit.close(); //закрытие попапа изменения данных профиля
});

const popupWithFormAdd = new PopupWithForm(".popup_type_add", (event) => { //создание экземпляра класса формы добавления нового места
  event.preventDefault();
  const {firstValue, secondValue} = popupWithFormAdd.getValues() //получение данных из формы ввода

  const place = new Section({items: [{name: firstValue, link: secondValue}], //добавление нового места
    renderer: (item) => {
      place.addItem(
        createCard(item.name, item.link), false);
    }
  }, ".elements");

  place.renderItems(); //отображение изменений
  popupWithFormAdd.close(); //закрытие попапа добавления нового места
  popupWithFormAdd.returnButtonToInitalState(); // возврат кнопки в исходное состояние (неактивная прозрачная)
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
  const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"});
  popupWithFormEdit.setInputValues({
    firstValue: userInfo.getUserInfo().profileName,
    secondValue: userInfo.getUserInfo().profileAbout
  });
  popupWithFormEdit.dispatchInput();
  popupWithFormEdit.open();
};
const openPlaceEditor = () => popupWithFormAdd.open();

//инициалицая начальными карточками
const initalPlaces = new Section({items: initialCards, 
  renderer: (item) => {
    initalPlaces.addItem(
      createCard(item.name, item.link));
  }
}, ".elements");

initalPlaces.renderItems();

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