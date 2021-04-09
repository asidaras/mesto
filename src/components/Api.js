export default class Api {
  constructor({server, token, cohort}) {
    this._server = server;
    this._token = token;
    this._cohort = cohort;
    this._url = this._server + "/v1/" + this._cohort;
  }

  getUserInfo() {
    const userStr = "/users/me";
    fetch(this._url + userStr, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
     return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
        console.log(err);
    }); 
  }

  getInitialCards() {
    const cardStr = "/cards";
    fetch(this._url + cardStr, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
       return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
          console.log(err);
      }); 
    }
}