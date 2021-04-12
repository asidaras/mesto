export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event){
    if (event.key === "Escape")
      this.close();
  }

  savingStateToggle(buttonInitalMessage, save){
    const submitButton = this._popup.querySelector(".popup__submit-button");
    if (save){
      submitButton.textContent = "Сохранение...";
    }
    else{
      submitButton.textContent = buttonInitalMessage;
    }
  }

  setEventListeners(){
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close-button")) 
        this.close();
    });
  }

  open(){
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}