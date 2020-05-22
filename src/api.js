import Event from "./models/events-adapter.js";
import {SERVER_URL, START_SUCCESS_STATUS, START_UNSUCCESS_STATUS, HttpMethod} from "./const.js";

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
    this._adapter = new Event();
  }

  checkStatus(response) {
    if (response.status >= START_SUCCESS_STATUS && response.status < START_UNSUCCESS_STATUS) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _getHeaders(isThisRequestWithBody) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    if (isThisRequestWithBody) {
      headers.append(`Content-Type`, `application/json`);
    }

    return headers;
  }

  getEvents() {
    const headers = this._getHeaders();

    return fetch(`${SERVER_URL}points`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventsToFront);
  }

  getDestinations() {
    const headers = this._getHeaders();

    return fetch(`${SERVER_URL}destinations`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  getOffers() {
    const headers = this._getHeaders();

    return fetch(`${SERVER_URL}offers`, {headers})
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  updateEvent(id, data) {
    const headers = this._getHeaders(true);

    return fetch(`${SERVER_URL}points/${id}`, {
      method: HttpMethod.PUT,
      body: JSON.stringify(this._adapter.parseEventToBack(data)),
      headers,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventToFront);
  }

  createEvent(data) {
    const headers = this._getHeaders(true);

    return fetch(`${SERVER_URL}points`, {
      method: HttpMethod.POST,
      body: JSON.stringify(this._adapter.parseEventToBack(data)),
      headers,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .then(this._adapter.parseEventToFront);
  }

  deleteEvent(id) {
    const headers = this._getHeaders(true);

    return fetch(`${SERVER_URL}points/${id}`, {
      method: HttpMethod.DELETE,
      headers,
    })
      .then(this._checkStatus);
  }
}
