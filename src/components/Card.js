export default class Card {
  constructor(name, link, handleCardClick, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getPictureTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }

  _getPictureElementImage() {
    return this._pictureElement.querySelector(".elements__image");
  }

  _likePicture() {
    this._pictureElement
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }

  _deletePicture() {
    this._pictureElement.remove();
  }

  _setEventListeners() {
    this._pictureElement
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._likePicture();
      });
    this._pictureElement
      .querySelector(".elements__remove")
      .addEventListener("click", () => {
        this._deletePicture();
      });
    this._pictureElement
      .querySelector(".elements__image-container")
      .addEventListener("click", this._handleCardClick);
  }

  createCard() {
    this._pictureElement = this._getPictureTemplate();
    this._setEventListeners();
    const pictureElementImage = this._getPictureElementImage();
    pictureElementImage.src = this._link;
    pictureElementImage.alt = this._name;
    this._pictureElement.querySelector(
      ".elements__title"
    ).textContent = this._name;

    return this._pictureElement;
  }
}
