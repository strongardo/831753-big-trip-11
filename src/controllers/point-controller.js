import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace} from "../utils/dom.js";

export default class PointController {
  constructor(container, event, closeOtherForms) {
    this._container = container;
    this._event = event;
    this._closeOtherForms = closeOtherForms;

    this._isIventOpened = false;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    // this._onCityChange = this._onCityChange.bind(this);
  }

  render() {
    if (!this._isIventOpened) {
      this._isIventOpened = true;
      this._eventComponent = new EventComponent(this._event);
      this._eventComponent.setEditButtonClickHandler(this._onEditButtonClick);

      if (this._eventEditComponent) {
        this._replaceEditToEvent();
        return;
      }
      render(this._container, this._eventComponent, `beforeend`);
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

  _formRender() {
    const oldEventEditComponent = this._eventEditComponent;
    this._eventEditComponent = new EventEditComponent(this._event);

    if (this._isIventOpened) {
      this._replaceEventToEdit();
      this._isIventOpened = false;
    } else {
      replace(this._eventEditComponent, oldEventEditComponent);
    }
    this._addFormHandlers();
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _addFormHandlers() {
    this._eventEditComponent.setFormSubmitHandler(this._onFormSubmit);
    this._eventEditComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._eventEditComponent.setFavoriteChangeHandler(this._onFavoriteChange);
    this._eventEditComponent.setTypeChangeHandler(this._onTypeChange);
    this._eventEditComponent.setCityChangeHandler(this._onCityChange);
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
    this._event = Object.assign({}, this._event, {isFavorite: !this._event.isFavorite});
    this._formRender();
  }

  _onTypeChange(tripType) {
    // const newType = this._event.types.find((it) => {
    //   return it.name === tripType;
    // });
    this._event = Object.assign({}, this._event, {type: tripType});
    this._formRender();
  }

  // _onCityChange(pointDestination) {
  //   const newDestination = this._event.destinations.find((it) => {
  //     return it.city === pointDestination;
  //   });
  //   this._event = Object.assign({}, this._event, {destination: newDestination});
  //   this._formRender();
  // }

  _removeOnEscKeyDownHandler() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

}
