import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditFormElementName = popupEdit.querySelector(".popup__input_type_name");
const popupEditFormElementAbout = popupEdit.querySelector(".popup__input_type_about");
const popupEditForm = popupEdit.querySelector(".popup__form");

const popups = document.querySelectorAll(".popup");
const popupAdd = document.querySelector(".popup_type_add");
const popupAddFormElementTitle = popupAdd.querySelector(".popup__input_type_title");
const popupAddFormElementLink = popupAdd.querySelector(".popup__input_type_link");
const popupAddForm = popupAdd.querySelector(".popup__form");

const popupImage = document.querySelector(".popup_type_img");
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageFigCaption = popupImage.querySelector(".popup__figcaption");

const pictureContainer = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(name, title){
  const card = new Card(name, title, openPicture, "#picture-template");
  return card.createCard();
}

function saveChangesInProfile(event) {
  event.preventDefault();
  profileName.textContent = popupEditFormElementName.value;
  profileAbout.textContent = popupEditFormElementAbout.value;
  closePopup(popupEdit);
}

function addNewPlace(event) {
  event.preventDefault();
  pictureContainer.prepend(createCard(popupAddFormElementTitle.value, popupAddFormElementLink.value));
  closePopup(popupAdd);
  popupAddForm.reset();
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
  popupImageImg.src = event.target.src;
  popupImageImg.alt = event.target.alt;
  popupImageFigCaption.textContent = event.target.alt;
  openPopup(popupImage);
}

function setEventListenersForClosePopup() {
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened")) 
        closePopup(popup);
      if (event.target.classList.contains("popup__close-button"))
        closePopup(popup);
    });
  });
}

const openProfileEditor = () => {
  popupEditFormElementName.value = profileName.textContent;
  popupEditFormElementAbout.value = profileAbout.textContent;
  popupEditFormElementName.dispatchEvent(new Event("input"));
  popupEditFormElementAbout.dispatchEvent(new Event("input"));
  /*dispatchEvent нужен для имитации события input, а следовательно
  запуска checkInputValidity и toggleButtonState из validate.js в том случае,
  если была стёрта строка имени либо описания и попап был закрыт. При следующем
  открытии попапа поля будут снова заполены данными профиля, но без события input
  валидатор посчитает это как за пустое поле на предыдущем шаге и будут высвечены ошибки,
  заблокирована кнопка до тех пор, по не будет произведён ввод каких-либо значений
  с клавиатуры, либо стирание символа.*/
  return openPopup(popupEdit);
};
const openPlaceEditor = () => openPopup(popupAdd);

initialCards.forEach((item) => {
  pictureContainer.append(createCard(item.name, item.link));
});

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

setEventListenersForClosePopup(); //закрытие popup кликом на фон и на кнопку
profileAddButton.addEventListener("click", openPlaceEditor);
profileEditButton.addEventListener("click", openProfileEditor);
popupEditForm.addEventListener("submit", saveChangesInProfile);
popupAddForm.addEventListener("submit", addNewPlace);
