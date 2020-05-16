import PointComponent from "../components/point-component.js";
import FormComponent from "../components/form-component.js";
import {render, replace} from "../utils/dom.js";

export default class PointController {
  constructor(container, place, model, id, closeOtherForms, onChangeEvents, isThisNewEvent, toggleAddBtnStatus, api) {
    this._container = container;
    this._place = place;
    this._eventsModel = model;
    this._eventId = id;
    this._closeOtherForms = closeOtherForms;
    this._onChangeEvents = onChangeEvents;
    this._isThisNewEvent = isThisNewEvent;
    this._toggleAddBtnStatus = toggleAddBtnStatus;
    this._api = api;

    this._isIventOpened = false;

    this._pointComponent = null;
    this._formComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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
      this._pointComponent = new PointComponent(event);
      this._pointComponent.setEditButtonClickHandler(this._onEditButtonClick);

      if (this._formComponent) {
        this._replaceEditToEvent();
        return;
      }
      render(this._container, this._pointComponent, this._place);
    }
  }

  formRender(newEvent) {
    const destinations = this._eventsModel.getDestinations();
    if (this._isIventOpened) {
      const event = this._eventsModel.getEvent(this._eventId);
      this._formComponent = new FormComponent(event, this._isThisNewEvent, destinations);
      this._replaceEventToEdit();
      this._isIventOpened = false;
    } else {
      const oldFormComponent = this._formComponent;
      this._formComponent = new FormComponent(newEvent, this._isThisNewEvent, destinations);
      replace(this._formComponent, oldFormComponent);
    }
    this._addFormHandlers();
  }

  _onEditButtonClick() {
    this._closeOtherForms();
    this.formRender();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.render();
      this._removeOnEscKeyDownHandler();
    }
  }

  _replaceEventToEdit() {
    replace(this._formComponent, this._pointComponent);
  }

  _addFormHandlers() {
    if (!this._isThisNewEvent) {
      this._formComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
      this._formComponent.setFavoriteChangeHandler(this._onFavoriteChange);
    }
    this._formComponent.setTypeChangeHandler(this._onTypeChange);
    this._formComponent.setDeleteBtnClickHandler(this._onDeleteBtnClick);
    this._formComponent.setSaveBtnClickHandler(this._onSaveBtnClick);
    this._formComponent.setCityChangeHandler(this._onCityChange);
    this._formComponent.setPriceChangeHandler(this._onPriceChange);
    this._formComponent.setStartTimeChangeHandler(this._onStartTimeChange);
    this._formComponent.setEndTimeChangeHandler(this._onEndTimeChange);
    this._formComponent.setPriceKeypressHandler();
    this._formComponent.setCityKeypressHandler();
  }

  _onCloseButtonClick() {
    this.render();
    this._removeOnEscKeyDownHandler();
  }

  _onFavoriteChange() {
    this._temporaryEvent.isFavorite = !this._temporaryEvent.isFavorite;
  }

  _onTypeChange(tripType) {
    this._temporaryEvent.type = tripType;
    const offers = this._eventsModel.getOffers();
    const possibleOffers = offers.find((it) => {
      if (it.type === tripType) {
        return true;
      }
      return false;
    });
    this._temporaryEvent.offers = possibleOffers.offers;
    this.formRender(this._temporaryEvent);
  }

  _onCityChange(destination) {
    this._temporaryEvent.destination.name = destination;
  }

  _onPriceChange(price) {
    this._temporaryEvent.basePrice = price;
  }

  _onStartTimeChange(time) {
    this._temporaryEvent.dateFrom = time;
  }

  _onEndTimeChange(time) {
    this._temporaryEvent.dateTo = time;
  }

  _onDeleteBtnClick() {
    this._eventsModel.deleteEvent(this._eventId);
    this._onChangeEvents();
    this._removeOnEscKeyDownHandler();
    if (this._isThisNewEvent) {
      this._toggleAddBtnStatus();
    }
  }

  _onSaveBtnClick(evt) {
    evt.preventDefault();
    const newEvent = this._temporaryEvent;

    if (newEvent) {
      this._api.updateEvent(this._eventId, newEvent)
        .then((eventFromServer) => {
          this._eventsModel.updateEvent(this._eventId, eventFromServer);
          this._temporaryEvent = null;
          this._onChangeEvents();
        });
    } else {
      this.render();
    }

    this._removeOnEscKeyDownHandler();

    if (this._isThisNewEvent) {
      this._toggleAddBtnStatus();
    }
  }

  _removeOnEscKeyDownHandler() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToEvent() {
    replace(this._pointComponent, this._formComponent);
  }

}
