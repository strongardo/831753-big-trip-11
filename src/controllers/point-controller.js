import EventComponent from "../components/point-component.js";
import EventEditComponent from "../components/form-component.js";
import {render, replace} from "../utils/dom.js";

export default class PointController {
  constructor(container, place, model, id, closeOtherForms, onChangeEvents, isThisNewEvent = false) {
    this._container = container;
    this._place = place;
    this._eventsModel = model;
    this._eventId = id;
    this._closeOtherForms = closeOtherForms;
    this._onChangeEvents = onChangeEvents;
    this._isThisNewEvent = isThisNewEvent;

    this._isIventOpened = false;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);
    this._onSaveBtnClick = this._onSaveBtnClick.bind(this);
    this._onCityChange = this._onCityChange.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onStartTimeChange = this._onStartTimeChange.bind(this);
    this._onEndTimeChange = this._onEndTimeChange.bind(this);

    this._temporaryEvent = Object.assign({}, this._eventsModel.getEvent(this._eventId));
  }

  render() {
    if (!this._isIventOpened) {
      this._isIventOpened = true;
      const event = this._eventsModel.getEvent(this._eventId);
      this._eventComponent = new EventComponent(event);
      this._eventComponent.setEditButtonClickHandler(this._onEditButtonClick);

      if (this._eventEditComponent) {
        this._replaceEditToEvent();
        return;
      }
      render(this._container, this._eventComponent, this._place);
    }
  }

  _onEditButtonClick() {
    this._closeOtherForms();
    this._formRender();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.render();
      this._removeOnEscKeyDownHandler();
    }
  }

  _formRender(newEvent) {
    if (this._isIventOpened) {
      const event = this._eventsModel.getEvent(this._eventId);
      this._eventEditComponent = new EventEditComponent(event, this._isThisNewEvent);
      this._replaceEventToEdit();
      this._isIventOpened = false;
    } else {
      const oldEventEditComponent = this._eventEditComponent;
      this._eventEditComponent = new EventEditComponent(newEvent, this._isThisNewEvent);
      replace(this._eventEditComponent, oldEventEditComponent);
    }
    this._addFormHandlers();
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _addFormHandlers() {
    if (!this._isThisNewEvent) {
      this._eventEditComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
      this._eventEditComponent.setFavoriteChangeHandler(this._onFavoriteChange);
    }
    this._eventEditComponent.setTypeChangeHandler(this._onTypeChange);
    this._eventEditComponent.setDeleteBtnClickHandler(this._onDeleteBtnClick);
    this._eventEditComponent.setSaveBtnClickHandler(this._onSaveBtnClick);
    this._eventEditComponent.setCityChangeHandler(this._onCityChange);
    this._eventEditComponent.setPriceChangeHandler(this._onPriceChange);
    this._eventEditComponent.setStartTimeChangeHandler(this._onStartTimeChange);
    this._eventEditComponent.setEndTimeChangeHandler(this._onEndTimeChange);
    this._eventEditComponent.setPriceKeypressHandler();
    this._eventEditComponent.setCityKeypressHandler();
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this.render();
    this._removeOnEscKeyDownHandler();
  }

  _onCloseButtonClick() {
    this.render();
    this._removeOnEscKeyDownHandler();
  }

  _onFavoriteChange() {
    this._temporaryEvent.isFavorite = !this._temporaryEvent.isFavorite;
    this._eventEditComponent.cons();
  }

  _onTypeChange(tripType) {
    this._temporaryEvent.type = tripType;
    this._formRender(this._temporaryEvent);
  }

  _onCityChange(destination) {
    this._temporaryEvent.destination.name = destination;
  }

  _onPriceChange(price) {
    // eslint-disable-next-line camelcase
    this._temporaryEvent.base_price = price;
  }

  _onStartTimeChange(time) {
    // eslint-disable-next-line camelcase
    this._temporaryEvent.date_from = time;
  }

  _onEndTimeChange(time) {
    // eslint-disable-next-line camelcase
    this._temporaryEvent.date_to = time;
  }

  _onDeleteBtnClick() {
    this._eventsModel.deleteEvent(this._eventId);
    this._onChangeEvents();
  }

  _onSaveBtnClick(evt) {
    evt.preventDefault();
    const newEvent = this._temporaryEvent;

    if (newEvent) {
      this._eventsModel.updateEvent(this._eventId, newEvent);
      this._temporaryEvent = null;
      this._onChangeEvents();
    } else {
      this.render();
    }
  }

  _removeOnEscKeyDownHandler() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

}
