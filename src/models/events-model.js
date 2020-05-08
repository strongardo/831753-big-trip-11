import {FilterType, SortType} from "../const.js";

export default class Points {
  constructor() {
    this._events = [];

    this._filterType = FilterType.DEFAULT;
  }

  getAllEvents() {
    return this._events;
  }

  getSortedEvents(sortType) {
    const events = this._getFilteredEvents(this._events);
    return this._getSortedEvents(events, sortType);
  }

  getFilteredEvents(filterType) {
    this._filterType = filterType;
    return this._getFilteredEvents(this._events);
  }

  getEvent(id) {
    return this._events.find((item) => {
      return item.id === id;
    });
  }

  setEvents(events) {
    this._events = events;
  }

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), newEvent, this._events.slice(index + 1));

    return true;
  }

  createNewEvent() {
    const newId = this._events.length;
    // const newEvent = Object.assign({}, this._events[this._events.length - 1], {id: newId});
    const newEvent = {
      "base_price": 0,
      "date_from": new Date(),
      "date_to": new Date(),
      "destination": {
        "description": ``,
        "name": `Some city`,
        "pictures": [{
          "src": `https://picsum.photos/200`,
          "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        }],
      },
      "id": newId,
      "is_favorite": false,
      "offers": [
        {
          "title": `Choose meal`,
          "price": 180
        }, {
          "title": `Upgrade to comfort class`,
          "price": 50
        }
      ],
      "type": `taxi`,
    };
    this._events.push(newEvent);
    return newId;
  }

  deleteEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    return true;
  }

  _getFilteredEvents(events) {
    let filteredEvents = [];

    switch (this._filterType) {
      case FilterType.FUTURE:
        filteredEvents = events.filter((event) => {
          return event.date_from > new Date();
        });
        break;
      case FilterType.PAST:
        filteredEvents = events.filter((event) => {
          return event.date_to < new Date();
        });
        break;
      case FilterType.DEFAULT:
        filteredEvents = events;
        break;
    }

    return filteredEvents;
  }

  _getSortedEvents(events, sortType) {
    let sortedEvents = [];
    const eventsCopy = events.slice();

    switch (sortType) {
      case SortType.TIME:
        sortedEvents = eventsCopy.sort((a, b) => (b.date_to - b.date_from) - (a.date_to - a.date_from));
        break;
      case SortType.PRICE:
        sortedEvents = eventsCopy.sort((a, b) => b.base_price - a.base_price);
        break;
      case SortType.DEFAULT:
        sortedEvents = eventsCopy;
        break;
    }
    return sortedEvents;
  }
}
