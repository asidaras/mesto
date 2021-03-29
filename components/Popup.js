export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  _handleEscClose(event){
    const openedPopup = document.querySelector(".popup_opened");
    if (event.key === "Escape" && openedPopup != null) 
      this.close();
  }

  setEventListeners(){
    document.querySelector(this._popupSelector).addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close-button")) 
        this.close();
    });
  }

  open(){
    document.querySelector(this._popupSelector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close(){
    document.querySelector(this._popupSelector).classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}