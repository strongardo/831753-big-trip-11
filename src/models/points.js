import {FilterType, SortType} from "../const.js";

export default class Points {
  constructor() {
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
  }

  getFilteredEvents(filterType) {
    let filteredEvents = [];

    switch (filterType) {
      case FilterType.FUTURE:
        filteredEvents = this._events.filter((event) => {
          return event.date_from > new Date();
        });
        break;
      case FilterType.PAST:
        filteredEvents = this._events.filter((event) => {
          return event.date_to < new Date();
        });
        break;
      case FilterType.DEFAULT:
        filteredEvents = this._events;
        break;
    }

    return filteredEvents;
  }

  getSortedEvents(sortType) {
    let sortedEvents = [];
    const events = this._events.slice();

    switch (sortType) {
      case SortType.TIME:
        sortedEvents = events.sort((a, b) => a.date_from - b.date_from); // от меньшего к большему
        break;
      case SortType.PRICE:
        sortedEvents = events.sort((a, b) => b.base_price - a.base_price); // от большего к меньшему
        break;
      case SortType.DEFAULT:
        sortedEvents = events;
        break;
    }
    return sortedEvents;
  }

  // updateEvent(id, newEvent) {
  //   const index = this._events.findIndex((it) => it.id === id);

  //   if (index === -1) {
  //     return false;
  //   }

  //   this._events = [].concat(this._tasks.slice(0, index), newEvent, this._events.slice(index + 1));

  //   return true;
  // }
}
