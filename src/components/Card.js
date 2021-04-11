export default class Card {
  constructor(name, link, handleCardClick, handleDeletePicture, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDeletePicture = handleDeletePicture;
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

  _setEventListeners() {
    this._pictureElement
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._likePicture();
      });
    this._pictureElement
      .querySelector(".elements__remove")
      .addEventListener("click", this._handleDeletePicture);
    this._pictureElement
      .querySelector(".elements__image-container")
      .addEventListener("click", this._handleCardClick);
  }

  setCardId(id){
    this._id = id;
  }

  getCardId(){
    return this._id;
  }

  createCard(my=false) {
    this._pictureElement = this._getPictureTemplate();
    this._pictureElement.setAttribute("id", this.getCardId());
    if (my){
      const removeElement = this._pictureElement.querySelector(".elements__remove");
      removeElement.classList.add("elemenst__remove_type_active");
      removeElement.removeAttribute("disabled");
    }
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
