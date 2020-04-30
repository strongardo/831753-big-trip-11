import AbstractComponent from "./abstract-component.js";
import {createEventEditTemplate} from "../templates/event-edit.js";

export default class EventEdit extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  setFormSubmitHandler(cb) {
    this.getElement().addEventListener(`submit`, cb);
  }

  setCloseButtonClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }

  setFavoriteChangeHandler(cb) {
    this.getElement().querySelector(`#event-favorite-1`).addEventListener(`change`, cb);
  }

  setCityChangeHandler(cb) {
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, (evt) => {

      const pointDestination = evt.target.value;

      if (this._event.destination === pointDestination) {
        return;
      }

      cb(pointDestination);
    });
  }

  setTypeChangeHandler(cb) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (!evt.target.classList.contains(`event__type-input`)) {
        return;
      }

      const tripType = evt.target.value;

      if (this._event.type.name === tripType) {
        return;
      }

      cb(tripType);
    });
  }
}
