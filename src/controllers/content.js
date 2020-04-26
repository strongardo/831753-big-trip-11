import {START_INDEX_FOR_EVENTS} from "../const.js";
import {SortType} from "../const.js";
import SortComponent from "../components/sort.js";
import EventEditComponent from "../components/event-edit.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import EventComponent from "../components/event.js";
import NoEventsComponent from "../components/no-events.js";
import {render, replace} from "../utils/dom.js";

export default class ContentController {
  constructor(container) {
    this._container = container;
    this._daysContainer = null;
    this._events = null;

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();
  }

  _getDays(events) {
    let currentDay = events[START_INDEX_FOR_EVENTS].startTime.getDate();
    const days = [events[START_INDEX_FOR_EVENTS].startTime];

    for (const item of events) {
      if (item.startTime.getDate() !== currentDay) {
        days.push(item.startTime);
        currentDay = item.startTime.getDate();
      }
    }

    return days;
  }

  _getCurrentEvents(day) {
    return this._events.filter((item) => {
      return item.startTime.getDate() === day.getDate();
    });
  }

  _renderEvent(event, container) {
    const eventComponent = new EventComponent(event);
    const eventEditComponent = new EventEditComponent(event);

    const replaceEventToEdit = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceEditToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const removeOnEscKeyDownHandler = () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        removeOnEscKeyDownHandler();
      }
    };

    const onSetEditButtonClick = () => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      removeOnEscKeyDownHandler();
    };

    const onCancelButtonClick = () => {
      replaceEditToEvent();
      removeOnEscKeyDownHandler();
    };

    eventComponent.setEditButtonClickHandler(onSetEditButtonClick);
    eventEditComponent.setFormSubmitHandler(onFormSubmit);
    eventEditComponent.setCancelButtonClickHandler(onCancelButtonClick);

    render(container, eventComponent, `beforeend`);
  }

  _renderDay(dayComponent, events) {
    render(this._daysContainer, dayComponent, `beforeend`);
    const day = dayComponent.getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);
    events.forEach((event) => {
      this._renderEvent(event, tripEventsList);
    });
  }

  _getSortedEvents(sortType) {
    let sortedEvents = [];
    const events = this._events.slice();

    switch (sortType) {
      case SortType.TIME:
        sortedEvents = events.sort((a, b) => a.startTime - b.startTime); // от меньшего к большему
        break;
      case SortType.PRICE:
        sortedEvents = events.sort((a, b) => b.price - a.price); // от большего к меньшему
        break;
      case SortType.DEFAULT:
        sortedEvents = events;
        break;
    }

    return sortedEvents;
  }

  _renderDays() {
    const days = this._getDays(this._events);
    days.forEach((day, i) => {
      const dayComponent = new DayComponent(i + 1, day); // Номер дня не может быть нулем, поэтому +1
      const currentEvents = this._getCurrentEvents(day);
      this._renderDay(dayComponent, currentEvents);
    });
  }

  _renderSort() {
    const inputs = this._sortComponent.getElement().querySelectorAll(`.trip-sort__input`);
    inputs.forEach((input) => {
      this._sortComponent.setSortTypeChangeHandler(input, () => {
        this._daysContainer.innerHTML = ``;
        const sortType = input.dataset.sortType;
        if (sortType === SortType.DEFAULT) {
          this._renderDays();
        } else {
          const dayComponent = new DayComponent();
          const events = this._getSortedEvents(sortType);
          this._renderDay(dayComponent, events);
        }
      });
    });

    render(this._container, this._sortComponent, `beforeend`);
  }

  render(events) {
    this._events = events;

    if (this._events.length) {
      this._renderSort();

      render(this._container, this._daysListComponent, `beforeend`);

      this._daysContainer = this._container.querySelector(`.trip-days`);
      this._renderDays();
    } else {
      render(this._container, this._noEventsComponent, `beforeend`);
    }
  }
}
