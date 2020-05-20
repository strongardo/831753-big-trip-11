import {START_INDEX_FOR_EVENTS, RenderPosition, SortType} from "../const.js";
import NavController from "./nav-controller.js";
import FilterController from "./filter-controller.js";
import SortController from "./sort-controller.js";
import PointController from "./point-controller.js";
import StatisticComponent from "../components/statistic-component.js";
import StubComponent from "../components/stub-component.js";
import DaysListComponent from "../components/days-list-component.js";
import DayComponent from "../components/day-component.js";
import {render} from "../utils/dom.js";

export default class MasterController {
  constructor(eventsModel, destinationsModel, offersModel, api) {
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._stubComponent = new StubComponent();
    this._statisticComponent = new StatisticComponent(this._eventsModel);
    this._daysListComponent = new DaysListComponent();

    this._navController = new NavController(this._statisticComponent);
    this._filterController = null;
    this._sortController = null;

    this._container = document.querySelector(`.trip-events`);
    this._daysContainer = this._daysListComponent.getElement();
    this._addBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._observer = [];
    this._closeAllForms = this._closeAllForms.bind(this);
    this._onChangeFilter = this._onChangeFilter.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
    this._onAddBtnClick = this._onAddBtnClick.bind(this);
    this._reRenderDays = this._reRenderDays.bind(this);
    this._toggleAddBtnStatus = this._toggleAddBtnStatus.bind(this);
  }

  render() {
    this._setAddBtnClickHandler();

    this._renderNav();
    this._renderFilter();
    this._renderSort();

    const events = this._eventsModel.getAllEvents();

    this._renderDaysList();
    this._renderDays(events);

    this._renderStatistic();
  }

  _setAddBtnClickHandler() {
    this._addBtn.addEventListener(`click`, this._onAddBtnClick);
  }

  _onAddBtnClick() {
    this._toggleAddBtnStatus();
    this._resetFiltersAndSorts();
    let container = this._daysContainer;
    if (!container) {
      container = this._container;
    }
    const pointController = new PointController(container, RenderPosition.AFTERBEGIN, this._eventsModel, this._destinationsModel, this._offersModel, null, this._closeAllForms, this._reRenderDays, true, this._toggleAddBtnStatus, this._api);
    this._observer.push(pointController);
    pointController.render();
    pointController.formRender();
  }

  _renderStatistic() {
    const сontainer = document.querySelector(`.page-main__container`);
    render(сontainer, this._statisticComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderStub() {
    render(this._container, this._stubComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    this._sortController = new SortController(this._onChangeSort, this._eventsModel);
    this._sortController.render();
  }

  _renderFilter() {
    this._filterController = new FilterController(this._onChangeFilter, this._eventsModel);
    this._filterController.render();
  }

  _renderNav() {
    this._navController.render();
  }

  _renderPoints(events) {
    const dayComponent = new DayComponent();
    this._renderDay(dayComponent, events);
  }

  _renderDays(events) {
    if (!events.length) {
      this._renderStub();
      return;
    }
    const days = this._getDays(events);
    days.forEach((day, i) => {
      const dayComponent = new DayComponent(i + 1, day);
      const thisDayEvents = this._getThisDayEvents(day, events);
      this._renderDay(dayComponent, thisDayEvents);
    });
  }

  _getDays(events) {
    let currentDay = events[START_INDEX_FOR_EVENTS].dateFrom.getDate();
    const days = [events[START_INDEX_FOR_EVENTS].dateFrom];

    for (const item of events) {
      if (item.dateFrom.getDate() !== currentDay) {
        days.push(item.dateFrom);
        currentDay = item.dateFrom.getDate();
      }
    }
    return days;
  }

  _getThisDayEvents(day, events) {
    return events.filter((item) => {
      return item.dateFrom.getDate() === day.getDate();
    });
  }

  _renderDay(dayComponent, events) {
    render(this._daysContainer, dayComponent, RenderPosition.BEFOREEND);
    const day = dayComponent.getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);
    events.forEach((event) => {
      const pointController = new PointController(tripEventsList, RenderPosition.BEFOREEND, this._eventsModel, this._destinationsModel, this._offersModel, event.id, this._closeAllForms, this._reRenderDays, false, this._toggleAddBtnStatus, this._api);
      this._observer.push(pointController);
      pointController.render();
    });
  }

  _closeAllForms() {
    this._observer.forEach((pointController, index) => {
      pointController.render();
      if (pointController.isThisNewEvent) {
        pointController.pointComponent.removeElement();
        this._observer.splice(index, index);
        this._toggleAddBtnStatus();
      }
    });
  }

  _onChangeFilter(filterType) {
    this._sortController.resetSorts();
    this._eventsModel.setFilterType(filterType);
    this._reRenderDays();
  }

  _onChangeSort(sortType) {
    this._eventsModel.setSortType(sortType);
    this._reRenderDays();
  }

  _reRenderDays(events = this._eventsModel.getEvents()) {
    this._clearDays();
    if (events.length > 0) {
      const sortType = this._eventsModel.getSortType();
      if (sortType !== SortType.DEFAULT) {
        this._renderPoints(events);
        return;
      } else {
        this._renderDays(events);
      }
    } else {
      this._renderStub();
    }
  }

  _clearDays() {
    this._daysContainer.innerHTML = ``;
    this._observer = [];
  }

  _resetFiltersAndSorts() {
    this._sortController.resetSorts();
    this._filterController.resetFilters();
    this._reRenderDays();
  }

  _toggleAddBtnStatus() {
    this._addBtn.disabled = !this._addBtn.disabled;
  }
}
