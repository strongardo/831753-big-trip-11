import Event from "./models/events-adapter.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
    this._adapter = new Event();
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventsToFront);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points/${id}`, {
      method: `PUT`,
      body: JSON.stringify(this._adapter.parseEventToBack(data)),
      headers,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventToFront);
  }

  createEvent(data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {
      method: `POST`,
      body: JSON.stringify(this._adapter.parseEventToBack(data)),
      headers,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventToFront);
  }

  deleteEvent(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(this._checkStatus);
  }
};

export default API;
