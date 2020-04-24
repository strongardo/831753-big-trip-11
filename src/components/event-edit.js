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

  setCancelButtonClickHandler(cb) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, cb);
  }
}
