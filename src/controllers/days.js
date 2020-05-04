import {START_INDEX_FOR_EVENTS} from "../const.js";
import FilterController from "../controllers/filter.js";
import SortController from "../controllers/sort.js";
import PointController from "./point-controller.js";
import NoEventsComponent from "../components/no-events.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import {render} from "../utils/dom.js";

export default class DaysController {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;

    this._noEventsComponent = new NoEventsComponent();
    this._daysListComponent = new DaysListComponent();

    this._observer = [];
    this._closeAllForms = this._closeAllForms.bind(this);
    this._onChangeFilter = this._onChangeFilter.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
  }

  render() {
    const filterController = new FilterController(this._onChangeFilter);
    filterController.render();

    const tripEvents = document.querySelector(`.trip-events`);

    if (!this._eventsModel.getEvents().length) {
      render(tripEvents, this._noEventsComponent, `beforeend`);
    } else {
      const sortController = new SortController(this._onChangeSort);
      sortController.render();
      render(tripEvents, this._daysListComponent, `beforeend`);
      const events = this._eventsModel.getEvents();
      this._renderDays(events);
    }
  }

  _renderDays(events) {
    const days = this._getDays(events);
    days.forEach((day, i) => {
      const dayComponent = new DayComponent(i + 1, day); // Номер дня не может быть нулем, поэтому +1
      const thisDayEvents = this._getThisDayEvents(day);
      this._renderDay(dayComponent, thisDayEvents);
    });
  }

  _renderEvents(events) {
    const dayComponent = new DayComponent();
    this._renderDay(dayComponent, events);
  }

  _getDays(events) {
    let currentDay = events[START_INDEX_FOR_EVENTS].date_from.getDate();
    const days = [events[START_INDEX_FOR_EVENTS].date_from];

    for (const item of events) {
      if (item.date_from.getDate() !== currentDay) {
        days.push(item.date_from);
        currentDay = item.date_from.getDate();
      }
    }

    return days;
  }

  _getThisDayEvents(day) {
    const events = this._eventsModel.getEvents();
    return events.filter((item) => {
      return item.date_from.getDate() === day.getDate();
    });
  }

  _renderDay(dayComponent, events) {
    const tripDays = this._daysListComponent.getElement();
    render(tripDays, dayComponent, `beforeend`);
    const day = dayComponent.getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);
    events.forEach((event) => {
      const pointController = new PointController(tripEventsList, event, this._closeAllForms);
      this._observer.push(pointController);
      pointController.render();
    });
  }

  _closeAllForms() {
    this._observer.forEach((pointController) => {
      pointController.render();
    });
  }

  _onChangeFilter(filterType) {
    const events = this._eventsModel.getFilteredEvents(filterType);
    this._clearDays();
    if (events.length) {
      this._renderDays(events);
    }
  }

  _onChangeSort(sortType) {
    const events = this._eventsModel.getSortedEvents(sortType);
    this._clearDays();
    if (sortType !== `default`) {
      this._renderEvents(events);
      return;
    }
    this._renderDays(events);
  }

  _clearDays() {
    const container = document.querySelector(`.trip-days`);
    container.innerHTML = ``;
  }
}
