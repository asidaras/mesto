export default class Api {
  constructor({server, token, cohort}) {
    this._server = server;
    this._token = token;
    this._cohort = cohort;
    this._url = this._server + "/v1/" + this._cohort;
    this._userStr = "/users/me";
    this._cardStr = "/cards";
    this._contentType = "application/json";
  }

  getUserInfo() {
    return fetch(this._url + this._userStr, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(this._url + this._cardStr, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeCard(cardId){
    return fetch(this._url + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

}