import {createElement} from "../utils.js";
import {createEventEditTemplate} from "../templates/event-edit.js";

export default class EventEdit {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
