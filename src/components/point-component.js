import AbstractComponent from "./abstract-component.js";
import {createPointTemplate} from "../templates/point-template.js";

export default class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createPointTemplate(this._event);
  }

  setEditButtonClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }
}
