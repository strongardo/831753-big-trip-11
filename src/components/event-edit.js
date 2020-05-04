import AbstractComponent from "./abstract-component.js";
import {createEventEditTemplate} from "../templates/event-edit.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class EventEdit extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickrs();
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  _applyFlatpickrs() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    const dateStartElement = this.getElement().querySelector(`#event-start-time-1`);
    const dateEndElement = this.getElement().querySelector(`#event-end-time-1`);
    this.flatpickrStart = flatpickr(dateStartElement, {
      altInput: false,
      allowInput: false,
      defaultDate: this._event.date_from || `today`,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });
    this.flatpickrEnd = flatpickr(dateEndElement, {
      altInput: false,
      allowInput: false,
      defaultDate: this._event.date_to || `today`,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });
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
