import "./index.css";
import Api from "../components/Api.js"
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
  profileEditButton,
  profileAddButton,
  profileAvatarButton
} from '../utils/constants.js';

let places; //Список карточек с местами
const api = new Api({server: "https://mesto.nomoreparties.co", token: "353f5b3a-f1c1-4e51-8411-778e0e42b67e", cohort: "cohort-22"});
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

const popupWithConfirm = new PopupWithConfirm(".popup_type_delete-confirm", (event) => { //создание экземпляра класса попапа подтверждения удаления
  event.preventDefault();
  places.removeItem(popupWithConfirm.getCardToRemove());
  console.log(places._items);
  //api.removeCard()
  popupWithConfirm.close();
});

const popupWithFormEdit = new PopupWithForm(".popup_type_edit", (event) => { //создание экземпляра класса формы изменения данных профиля
  event.preventDefault();

  const {name, about} = popupWithFormEdit.getValues() //получение данных из формы ввода
  userInfo.setUserInfo({ //присвоение новых данных
    newName: name, 
    newAbout: about
  });
  
  api.setUserInfo({ //отправка новых данных на сервер
    newName: name, 
    newAbout: about
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  popupWithFormEdit.close(); //закрытие попапа изменения данных профиля
});

const popupWithFormAdd = new PopupWithForm(".popup_type_add", (event) => { //создание экземпляра класса формы добавления нового места
  event.preventDefault();
  const {title, link} = popupWithFormAdd.getValues() //получение данных из формы ввода

  api.createNewCard({
    newTitle: title,
    newLink: link
  })
  .then((result) => {
    places.addItem(createCard(result._id, title, link, true), false);
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  popupWithFormAdd.close(); //закрытие попапа добавления нового места
});

//установка слушателей событий
popupWithImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithConfirm.setEventListeners();
popupWithAvatar.setEventListeners();

function createCard(id, name, title, my=false){ 
  const card = new Card(name, title, openPicture, deletePicture, "#picture-template");
  card.setCardId(id);
  return card.createCard(my);
}

function openPicture(event) { //колбэк функция открытия большой картинки
  popupWithImage.open(event.target.src, event.target.alt);
}

function deletePicture(event){
  popupWithConfirm.open(event.target.parentNode);
}

function renderUserInfoFromServer(){
  api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      newName: result.name,
      newAbout: result.about
    });
    userInfo.setUserId(result._id);
  })
  .catch((error) => {
    console.log(error);
  });
}

function renderInitalCardsFromServer(){
  api.getInitialCards()
  .then((result) => {
    places = new Section({items: result, 
      renderer: (item) => {
        if (item.owner._id === userInfo.getUserId()){
          places.addItem(
            createCard(item._id, item.name, item.link, true));
        }
        else{
          places.addItem(
            createCard(item._id, item.name, item.link));
        }
      }
    }, ".elements");
    places.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });
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

renderUserInfoFromServer(); //инициалицая имени и описания данными от сервера
renderInitalCardsFromServer(); //инициалицая начальными карточками

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