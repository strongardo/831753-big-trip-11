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

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._tasks.slice(0, index), newEvent, this._events.slice(index + 1));

    return true;
  }
}
