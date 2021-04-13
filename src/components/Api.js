export default class Api {
  constructor({server, token, cohort, handleResponse}) {
    this._server = server;
    this._token = token;
    this._cohort = cohort;
    this._handleResponse = handleResponse;
    this._url = this._server + "/v1/" + this._cohort;
    this._userStr = "/users/me";
    this._cardStr = "/cards";
    this._likes = "/cards/likes/";
    this._avatar = "/users/me/avatar";
    this._contentType = "application/json";
  }

  getUserInfo() {
    return fetch(this._url + this._userStr, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  setUserInfo({newName, newAbout}){
    return fetch(this._url + this._userStr, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(this._url + this._cardStr, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  createNewCard({newTitle, newLink}){
    return fetch(this._url + this._cardStr, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": this._contentType
      },
      body: JSON.stringify({
        name: newTitle,
        link: newLink
      })
    })
    .then(this._handleResponse);
  }

  removeCard(cardId){
    return fetch(this._url + this._cardStr + "/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then(this._handleResponse);
  }

  likeCard(cardId){
    return fetch(this._url + this._likes + cardId, {
      method: "PUT",
      headers: {
        authorization: this._token,
      }
    })
    .then(this._handleResponse);
  }

  dislikeCard(cardId){
    return fetch(this._url + this._likes + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then(this._handleResponse);
  }

  updateAvatar(userAvatar){
    console.log(userAvatar);
    return fetch(this._url +  this._avatar, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
    .then(this._handleResponse);
  }

}