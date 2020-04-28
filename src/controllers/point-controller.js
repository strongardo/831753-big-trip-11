import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace} from "../utils/dom.js";


export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._event = null;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
  }

  render(event) {
    this._event = event;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setEditButtonClickHandler(this._onEditButtonClick);
    this._eventEditComponent.setFormSubmitHandler(this._onFormSubmit);
    this._eventEditComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._eventEditComponent.setFavoriteChangeHandler(this._onFavoriteChange);

    render(this._container, this._eventComponent, `beforeend`);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _removeOnEscKeyDownHandler() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      this._removeOnEscKeyDownHandler();
    }
  }

  _onEditButtonClick() {
    this._replaceEventToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._replaceEditToEvent();
    this._removeOnEscKeyDownHandler();
  }

  _onCloseButtonClick() {
    this._replaceEditToEvent();
    this._removeOnEscKeyDownHandler();
  }

  _onFavoriteChange() {
    const newEvent = Object.assign({}, this._event, {isFavorite: !this._event.isFavorite});
    this._onDataChange(this, this._event, newEvent);
    this._eventEditComponent.rerender();
  }

}


