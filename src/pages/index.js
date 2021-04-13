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
const api = new Api({server: "https://mesto.nomoreparties.co", token: "353f5b3a-f1c1-4e51-8411-778e0e42b67e", cohort: "cohort-22", handleResponse: (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}});

const userInfo = new UserInfo({name: ".profile__name", about: ".profile__about"}); //получение данных профиля
const userAvatar = new UserAvatar({avatar: ".profile__avatar"});
const popupWithImage = new PopupWithImage(".popup_type_img"); //создание экземпляра класса попапа картинки

const popupWithAvatar = new PopupWithAvatar(".popup_type_change-avatar", (event) => {
  event.preventDefault();
  const {avatar} = popupWithAvatar.getValues();
  
  renderLoading("Сохранить", popupWithAvatar, true);
  api.updateAvatar(avatar)
  .then(() => {
    userAvatar.setUserAvatar(
    {
      newAvatar: avatar
    });
  })
  .catch((error) => {
    alert(error);
  })
  .finally(() => {
    renderLoading("Сохранить", popupWithAvatar, false);
    popupWithAvatar.close();
  });
});

const popupWithConfirm = new PopupWithConfirm(".popup_type_delete-confirm", (event) => { //создание экземпляра класса попапа подтверждения удаления
  event.preventDefault();
  const cardToRemove = popupWithConfirm.getCardToRemove();

  api.removeCard(cardToRemove.id)
  .then(() => {
    places.removeItem(cardToRemove);
    popupWithConfirm.close();
  })
  .catch((error) => {
    alert(error);
  });
});

const popupWithFormEdit = new PopupWithForm(".popup_type_edit", (event) => { //создание экземпляра класса формы изменения данных профиля
  event.preventDefault();

  const {name, about} = popupWithFormEdit.getValues() //получение данных из формы ввода
  
  renderLoading("Сохранить", popupWithFormEdit, true);
  api.setUserInfo({ //отправка новых данных на сервер
    newName: name, 
    newAbout: about
  })
  .then(() => {
    userInfo.setUserInfo(
    {
      newName: name, 
      newAbout: about
    });
  })
  .catch((error) => {
    alert(error);
  })
  .finally(() => {
    renderLoading("Сохранить", popupWithFormEdit, false);
    popupWithFormEdit.close();
  });
});

const popupWithFormAdd = new PopupWithForm(".popup_type_add", (event) => { //создание экземпляра класса формы добавления нового места
  event.preventDefault();
  const {title, link} = popupWithFormAdd.getValues() //получение данных из формы ввода

  renderLoading("Создать", popupWithFormAdd, true);
  api.createNewCard(
  {
    newTitle: title,
    newLink: link
  })
  .then((result) => {
    places.addItem(createCard(
    {
      id: result._id,
      userId: userInfo.getUserId(),
      name: title, 
      title: link, 
      isMy: true,
      likes: result.likes
    }), false);
  })
  .catch((error) => {
    alert(error);
  })
  .finally(() => {
    renderLoading("Создать", popupWithFormAdd, false);
    popupWithFormAdd.close();
  });
});

//установка слушателей событий
popupWithImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithConfirm.setEventListeners();
popupWithAvatar.setEventListeners();

function renderLoading(buttonInitalMessage, popup, isLoading){
  if(isLoading){
    popup.savingStateToggle(buttonInitalMessage, true);
  }
  else{
    popup.savingStateToggle(buttonInitalMessage, false);
  }
}

function createCard({id, userId, name, title, isMy, likes}){ 
  const card = new Card(
    {
      name: name, 
      link: title, 
      handleCardClick: openPicture, 
      handleDeletePicture: deletePicture,
      handleLikePicture: likeAndDislikePicture
    }, 
    "#picture-template");

  return card.createCard(
    {
      id: id, 
      isMy: isMy, 
      likes: likes,
      userId: userId
    });
}

function likeAndDislikePicture(event){
  const like = event.target;
  const likeCount = like.parentNode.querySelector(".elements__like-counter");
  const isLiked = like.classList.contains("elements__like_active");

  if (isLiked){
    api.dislikeCard(like.parentNode.parentNode.parentNode.id)
    .then((result) => {
      like.classList.remove("elements__like_active");
      likeCount.innerText = result.likes.length;
    })
    .catch((error) => {
      alert(error);
    });
  }
  else{
    api.likeCard(like.parentNode.parentNode.parentNode.id)
    .then((result) => {
      like.classList.add("elements__like_active");
      likeCount.innerText = result.likes.length;
    })
    .catch((error) => {
      alert(error);
    });
  }
}

function openPicture(event){ //колбэк функция открытия большой картинки
  popupWithImage.open(event.target.src, event.target.alt);
}

function deletePicture(event){
  popupWithConfirm.open(event.target.parentNode);
}

function renderUserInfoFromServer(){
  api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(
    {
      newName: result.name,
      newAbout: result.about
    });
    userInfo.setUserId(result._id);
    userAvatar.setUserAvatar(
      {
        newAvatar: result.avatar
      });
  })
  .catch((error) => {
    alert(error);
  });
}

function renderInitalCardsFromServer(){
  api.getInitialCards()
  .then((result) => {
    places = new Section(
      {
        items: result, 
        renderer: (item) => {
          places.addItem(
            createCard(
            {
              id: item._id,
              userId: userInfo.getUserId(),
              name: item.name, 
              title: item.link, 
              isMy: item.owner._id === userInfo.getUserId(),
              likes: item.likes
            })
          );
        }
      }, ".elements");
    places.renderItems();
  })
  .catch((error) => {
    alert(error);
  });
}

const openAvatarEditor = () => {
  popupWithAvatar.setInputValues(
  {
    avatar: userAvatar.getUserAvatar().profileAvatar
  });
  popupWithAvatar.open();
};

const openProfileEditor = () => {
  popupWithFormEdit.setInputValues(
  {
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