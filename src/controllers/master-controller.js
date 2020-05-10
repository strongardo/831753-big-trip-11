import {START_INDEX_FOR_EVENTS} from "../const.js";
import NavController from "./nav-controller.js";
import FilterController from "./filter-controller.js";
import SortController from "./sort-controller.js";
import PointController from "./point-controller.js";
import StatisticComponent from "../components/statistic-component.js";
import StubComponent from "../components/stub-component.js";
import DaysListComponent from "../components/days-list-component.js";
import DayComponent from "../components/day-component.js";
import {render} from "../utils/dom.js";

export default class DaysController {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;

    this._stubComponent = null;
    this._statisticComponent = null;
    this._daysListComponent = new DaysListComponent();

    this._filterController = null;
    this._sortController = null;

    this._addBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._observer = [];
    this._closeAllForms = this._closeAllForms.bind(this);
    this._onChangeFilter = this._onChangeFilter.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
    this._onAddBtnClick = this._onAddBtnClick.bind(this);
    this._onChangeEvents = this._onChangeEvents.bind(this);
    this._renderCharts = this._renderCharts.bind(this);
  }

  render() {
    this._addBtn.addEventListener(`click`, this._onAddBtnClick);

    const navController = new NavController();
    navController.render();

    if (!this._filterController) {
      this._filterController = new FilterController(this._onChangeFilter);
      this._filterController.render();
    }

    const tripEvents = document.querySelector(`.trip-events`);

    const events = this._eventsModel.getAllEvents();

    if (!events.length) {
      this._stubComponent = new StubComponent();
      render(tripEvents, this._stubComponent, `beforeend`);
    } else {
      if (!this._sortController) {
        this._sortController = new SortController(this._onChangeSort);
        this._sortController.render();
      }
      render(tripEvents, this._daysListComponent, `beforeend`);
      this._renderDays(events);
    }

    if (!this._statisticComponent) {
      this._statisticComponent = new StatisticComponent(this._eventsModel);
      const pageBodyContainer = document.querySelectorAll(`.page-body__container`)[1];
      render(pageBodyContainer, this._statisticComponent, `beforeend`);
      this._renderCharts();
    }
  }

  _renderCharts() {
    this._statisticComponent.renderCharts();
  }


  _renderEvents(events) {
    this._addBtn.disabled = false;

    const dayComponent = new DayComponent();
    this._renderDay(dayComponent, events);
  }

  _renderDays(events) {
    this._addBtn.disabled = false;

    const days = this._getDays(events);
    days.forEach((day, i) => {
      const dayComponent = new DayComponent(i + 1, day); // Номер дня не может быть нулем, поэтому +1
      const thisDayEvents = this._getThisDayEvents(day, events);
      this._renderDay(dayComponent, thisDayEvents);
    });
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

  _getThisDayEvents(day, events) {
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
      const pointController = new PointController(tripEventsList, `beforeend`, this._eventsModel, event.id, this._closeAllForms, this._onChangeEvents);
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
    this._onChangeEvents(events);
    this._resetSorts();
  }

  _onChangeSort(sortType) {
    const events = this._eventsModel.getSortedEvents(sortType);

    if (sortType !== `default`) {
      this._clearDays();
      this._renderEvents(events);
      return;
    }
    this._onChangeEvents(events);
  }

  _onChangeEvents(events) {
    const points = (events) ? events : this._eventsModel.getAllEvents();
    this._clearDays();
    if (this._stubComponent) {
      this.render();
    } else {
      this._renderDays(points);
    }
  }

  _clearDays() {
    let container = document.querySelector(`.trip-days`);
    if (!container) {
      container = document.querySelector(`.trip-events`);
    }
    container.innerHTML = ``;
    this._observer = [];
  }

  _onAddBtnClick(evt) {
    evt.target.disabled = true;
    this._resetFiltersAndSorts();
    let container = document.querySelector(`.trip-days`);
    if (!container) {
      container = document.querySelector(`.trip-events`);
    }
    const eventId = this._eventsModel.createNewEvent();
    const pointController = new PointController(container, `afterbegin`, this._eventsModel, eventId, this._closeAllForms, this._onChangeEvents, true);
    this._observer.push(pointController);
    pointController.render();
    pointController._formRender();
  }

  _resetFiltersAndSorts() {
    this._resetSorts();
    this._resetFilters();
    this._dispatchChanges();
  }

  _resetSorts() {
    const defaultSortButton = document.querySelector(`#sort-event`);

    if (defaultSortButton) {
      defaultSortButton.checked = true;
    }
  }

  _resetFilters() {
    const defaultFilterButton = document.querySelector(`#filter-everything`);
    defaultFilterButton.checked = true;
  }

  _dispatchChanges() {
    const defaultSortButton = document.querySelector(`#sort-event`);
    const defaultFilterButton = document.querySelector(`#filter-everything`);
    if (defaultSortButton) {
      defaultSortButton.dispatchEvent(new Event(`change`));
    }
    defaultFilterButton.dispatchEvent(new Event(`change`));
  }
}
