import AbstractComponent from "./abstract-component.js";
import {createFormTemplate} from "../templates/form-template.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class Form extends AbstractComponent {
  constructor(event, isThisNewEvent, destinations, offers) {
    super();

    this._event = event;
    this._isThisNewEvent = isThisNewEvent;
    this._destinations = destinations;
    this._offers = offers;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickrs();

    this._startTime = this._event.dateFrom;
    this._endTime = this._event.dateTo;

    this.setStartTimeChangeHandler = this.setStartTimeChangeHandler.bind(this);
    this.setEndTimeChangeHandler = this.setEndTimeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._event, this._isThisNewEvent, this._destinations, this._offers);
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
      defaultDate: this._event.dateFrom || `today`,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });
    this.flatpickrEnd = flatpickr(dateEndElement, {
      altInput: false,
      allowInput: false,
      defaultDate: this._event.dateTo || `today`,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this.flatpickrStart.config.onChange.push((selectedDates) => {
      this._startTime = selectedDates[0];
    });

    this.flatpickrEnd.config.onChange.push((selectedDates) => {
      this._endTime = selectedDates[0];
    });
  }

  setCloseButtonClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }

  setFavoriteChangeHandler(cb) {
    this.getElement().querySelector(`#event-favorite-1`).addEventListener(`change`, cb);
  }

  setDeleteBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, cb);
  }

  setSaveBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, cb);
  }

  setPriceChangeHandler(cb) {
    this.getElement().querySelector(`#event-price-1`).addEventListener(`change`, (evt) => {

      const price = evt.target.value;

      cb(price);
    });
  }

  setCityKeypressHandler() {
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`keypress`, (evt) => {
      evt.preventDefault();
    });
  }

  setPriceKeypressHandler() {
    this.getElement().querySelector(`#event-price-1`).addEventListener(`keypress`, (evt) => {
      if (evt.charCode && (evt.charCode < 48 || evt.charCode > 57)) {
        evt.preventDefault();
      }
    });
  }

  setStartTimeChangeHandler(cb) {
    this.getElement().querySelector(`#event-start-time-1`).addEventListener(`change`, () => {

      const time = this._startTime;

      cb(time);
    });
  }

  setEndTimeChangeHandler(cb) {
    this.getElement().querySelector(`#event-end-time-1`).addEventListener(`change`, () => {

      const time = this._endTime;

      cb(time);
    });
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

  setOffersChangeHandler(cb) {
    const inputs = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    inputs.forEach((input) => {
      input.addEventListener(`change`, cb);
    });
  }
}
