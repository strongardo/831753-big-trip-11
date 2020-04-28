import AbstractSmartComponent from "./abstract-smart-component.js";
import {createEventEditTemplate} from "../templates/event-edit.js";

export default class EventEdit extends AbstractSmartComponent {
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

  recoveryListeners() {

  }
}
