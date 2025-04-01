const token = localStorage.getItem("UserIdentifier");

class API {
  constructor({ makeRequest, headers }) {
    this._makeRequest = makeRequest;
    this._headers = headers;
  }

  getUser() {
    const endpoint = 'users/me';

    const requestOptions = {
      method: "GET",
      headers: this._headers,
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  updateProfileInfo(userObject) {
    const endpoint = 'users/me';
    
    const requestOptions = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userObject.name,
        about: userObject.about,
      })
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  updateProfilePicture(avatar) {
    const endpoint = `users/me/avatar`;

    const requestOptions = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  getCards() {
    const endpoint = 'cards';

    const requestOptions = {
      method: "GET",
      headers: this._headers,
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  addCard(name, link) {
    const endpoint = 'cards';

    const requestOptions = {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  deleteCard(cardId) {
    const endpoint = `cards/${cardId}`;

    const requestOptions = {
      method: "DELETE",
      headers: this._headers,
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  addCardLike(cardId) {
    const endpoint = `cards/${cardId}/likes`;

    const requestOptions = {
      method: "PUT",
      headers: this._headers,
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  removeCardLike(cardId) {
    const endpoint = `cards/${cardId}/likes`;
    
    const requestOptions = {
      method: "DELETE",
      headers: this._headers,
    }

    return this._makeRequest(endpoint, requestOptions)
  }
}

export const api = new API({
  makeRequest: async (endpoint, requestOptions)=> {
    try {
      const res = await fetch(`http://localhost:3000/${endpoint}`, requestOptions);

      if (res.ok) {
        return res.json();
      }

      const errorData = await res.json();
      return Promise.reject(errorData.message || `Erro na requisição. ${res.status}`);

    } catch (error) {
      return Promise.reject(error);
    }
  },
  headers: {
    "Authorization" : `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});