import PointComponent from "../components/point-component.js";
import FormComponent from "../components/form-component.js";
import {render, replace} from "../utils/dom.js";

export default class PointController {
  constructor(container, place, eventsModel, destinationsModel, offersModel, id, closeOtherForms, reRenderPoints, isThisNewEvent, toggleAddBtnStatus, api) {
    this._container = container;
    this._place = place;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._eventId = id;
    this._closeOtherForms = closeOtherForms;
    this._reRenderPoints = reRenderPoints;
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

    if (!this._isThisNewEvent) {
      this._temporaryEvent = Object.assign({}, this._eventsModel.getEvent(this._eventId));
    } else {
      this._temporaryEvent = Object.assign({}, this._eventsModel.createNewEvent());
    }
  }

  render() {
    if (!this._isIventOpened) {
      let event = this._eventsModel.getEvent(this._eventId);

      if (this._isThisNewEvent) {
        event = this._eventsModel.createNewEvent();
      }

      this._pointComponent = new PointComponent(event);
      this._pointComponent.setEditButtonClickHandler(this._onEditButtonClick);

      if (this._formComponent) {
        this._replaceEditToEvent();
        this._isIventOpened = true;
        return;
      }
      render(this._container, this._pointComponent, this._place);
      this._isIventOpened = true;
    }
  }

  formRender(newEvent) {
    const destinations = this._destinationsModel.getDestinations();
    if (this._isIventOpened) {
      let event = this._eventsModel.getEvent(this._eventId);

      if (this._isThisNewEvent) {
        event = this._eventsModel.createNewEvent();
      }

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
    const possibleOffers = this._offersModel.getPossibleOffers(tripType);
    this._temporaryEvent.offers = possibleOffers;
    this._temporaryEvent.type = tripType;
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

  _onChangeEvent(event) {
    if (event) {
      this._eventsModel.updateEvent(this._eventId, event);
    } else {
      this._eventsModel.deleteEvent(this._eventId);
    }
    this._temporaryEvent = null;
    this._removeOnEscKeyDownHandler();
    this._reRenderPoints();
  }

  _onError(elem) {
    this._toggleFormStatus(elem);
    elem.classList.add(`shake`);
    elem.style.border = `1px solid red`;
  }

  _toggleFormStatus(form) {
    form.querySelectorAll(`input, button`)
      .forEach((elem) => {
        elem.disabled = !elem.disabled;
      });
  }

  _onDeleteBtnClick(evt) {
    if (this._isThisNewEvent) {
      this._closeOtherForms();
    } else {
      const form = this._formComponent.getElement();
      form.style.border = ``;
      evt.target.innerText = `Deleting…`;
      this._api.deleteEvent(this._eventId)
      .then(() => {
        this._onChangeEvent();
      })
      .catch(() => {
        evt.target.innerText = `Delete`;
        this._onError(form);
      });
    }
  }

  _onSaveBtnClick(evt) {
    evt.preventDefault();
    const form = this._formComponent.getElement();
    form.style.border = ``;
    this._toggleFormStatus(form);
    evt.target.innerText = `Saving…`;

    const onSaveError = () => {
      evt.target.innerText = `Save`;
      this._onError(form);
    };

    if (this._isThisNewEvent) {
      this._api.createEvent(this._temporaryEvent)
        .then((eventFromServer) => {
          this._onChangeEvent(eventFromServer);
          this._toggleAddBtnStatus();
        })
        .catch(() => {
          onSaveError();
        });
    } else {
      this._api.updateEvent(this._eventId, this._temporaryEvent)
        .then((eventFromServer) => {
          this._onChangeEvent(eventFromServer);
        })
        .catch(() => {
          onSaveError();
        });
    }
  }

  _removeOnEscKeyDownHandler() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToEvent() {
    replace(this._pointComponent, this._formComponent);
  }

}
