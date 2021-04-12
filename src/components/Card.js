export default class Card {
  constructor({name, link, handleCardClick, handleDeletePicture, handleLikePicture}, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDeletePicture = handleDeletePicture;
    this._handleLikePicture = handleLikePicture;
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
      .classList.add("elements__like_active");
  }

  _setEventListeners() {
    this._pictureElement
      .querySelector(".elements__like")
      .addEventListener("click", this._handleLikePicture);
    this._pictureElement
      .querySelector(".elements__remove")
      .addEventListener("click", this._handleDeletePicture);
    this._pictureElement
      .querySelector(".elements__image-container")
      .addEventListener("click", this._handleCardClick);
  }

  getCardId(){
    return this._id;
  }

  createCard({id, isMy=false, likes, userId}) {
    this._pictureElement = this._getPictureTemplate();
    this._pictureElement.setAttribute("id", id);
    this._id = id;
    if (isMy){
      const removeElement = this._pictureElement.querySelector(".elements__remove");
      removeElement.classList.add("elemenst__remove_type_active");
      removeElement.removeAttribute("disabled");
    }
    this._setEventListeners();
    const pictureElementImage = this._getPictureElementImage();
    pictureElementImage.src = this._link;
    pictureElementImage.alt = this._name;
    this._pictureElement.querySelector(".elements__title").textContent = this._name;

    const pictureLikeCounter = this._pictureElement.querySelector(".elements__like-counter");

    likes.forEach(user => {
      for (let key in user){
        if (key != "_id"){
          continue;
        }
        else{
          if(user[key] === userId)
            this._likePicture();
        }
      }
    });

    pictureLikeCounter.textContent = likes.length;

    return this._pictureElement;
  }
}
