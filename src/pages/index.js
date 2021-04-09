import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import UserAvatar from "../components/UserAvatar.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js"
import PopupWithAvatar from "../components/PopupWithAvatar.js"
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  profileAvatarButton
} from '../utils/constants.js';

const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"}); //получение данных профиля

const userAvatar = new UserAvatar({avatar: ".profile__avatar"});

const popupWithImage = new PopupWithImage(".popup_type_img"); //создание экземпляра класса попапа картинки

const popupWithAvatar = new PopupWithAvatar(".popup_type_change-avatar", (event) => {
  event.preventDefault();

  const {avatar} = popupWithAvatar.getValues();
  userAvatar.setUserAvatar({
    newAvatar: avatar});
  popupWithAvatar.close();
});

const popupWithConfirm = new PopupWithConfirm(".popup_type_delete-confirm", (event) => {
  event.preventDefault();
  places.removeItem(popupWithConfirm.getCardToRemove());
  popupWithConfirm.close();
}); //создание экземпляра класса попапа подтверждения удаления

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

  places.addItem(createCard(title, link, true), false);

  popupWithFormAdd.close(); //закрытие попапа добавления нового места
});

//установка слушателей событий
popupWithImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithConfirm.setEventListeners();
popupWithAvatar.setEventListeners();

function createCard(name, title, my=false){ 
  const card = new Card(name, title, openPicture, deletePicture, "#picture-template");
  return card.createCard(my);
}

function openPicture(event) { //колбэк функция открытия большой картинки
  popupWithImage.open(event.target.src, event.target.alt);
}

function deletePicture(event){
  popupWithConfirm.open(event.target.parentNode);
}


const openAvatarEditor = () => {
  popupWithAvatar.setInputValues({
    avatar: userAvatar.getUserAvatar().profileAvatar
  });
  popupWithAvatar.open();
};

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
      submitButtonSelector: ".popup__submit-button",
      inactiveButtonClass: "popup__submit-button_inactive",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__input-error_active",
    },
    popupForm
  );
  validator.enableValidation();
});

profileAddButton.addEventListener("click", openPlaceEditor);
profileEditButton.addEventListener("click", openProfileEditor);
profileAvatarButton.addEventListener("click", openAvatarEditor);