import {FilterType, SortType, eventTemplate, Index} from "../const.js";

export default class Events {
  constructor() {
    this._events = [];

    this._filterType = FilterType.DEFAULT;
    this._sortType = SortType.DEFAULT;
  }

  setEvents(events) {
    this._events = events;
  }

  getAllEvents() {
    return this._events;
  }

  getEvents() {
    const events = this._getFilteredEvents();
    return this._getSortedEvents(events);
  }

  setFilterType(filterType) {
    this._filterType = filterType;
  }

  getFilterType() {
    return this._filterType;
  }

  setSortType(sortType) {
    this._sortType = sortType;
  }

  getSortType() {
    return this._sortType;
  }

  getEvent(id) {
    return this._events.find((item) => {
      return item.id === id;
    });
  }

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index !== Index.FOR_MISSING_ITEM) {
      this._events = [].concat(this._events.slice(0, index), newEvent, this._events.slice(index + 1));
    } else {
      this._events.push(newEvent);
    }
  }

  createNewEvent() {
    const newEvent = Object.assign({}, eventTemplate);
    const today = new Date();
    newEvent.dateFrom = today;
    newEvent.dateTo = today;
    return newEvent;
  }

  deleteEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === Index.FOR_MISSING_ITEM) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    return true;
  }

  _getFilteredEvents() {
    const events = this._events;
    let filteredEvents = [];

    switch (this._filterType) {
      case FilterType.FUTURE:
        filteredEvents = events.filter((event) => {
          return event.dateFrom > new Date();
        });
        break;
      case FilterType.PAST:
        filteredEvents = events.filter((event) => {
          return event.dateTo < new Date();
        });
        break;
      case FilterType.DEFAULT:
        filteredEvents = events;
        break;
    }

    return filteredEvents;
  }

  _getSortedEvents(events) {
    let sortedEvents = [];
    const eventsCopy = events.slice();

    switch (this._sortType) {
      case SortType.TIME:
        sortedEvents = eventsCopy.sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
        break;
      case SortType.PRICE:
        sortedEvents = eventsCopy.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.DEFAULT:
        sortedEvents = eventsCopy;
        break;
    }
    return sortedEvents;
  }
}
