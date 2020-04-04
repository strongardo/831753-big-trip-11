const EVENTS_COUNT = 3;

import {createInfo} from "./components/info.js";
import {createCost} from "./components/cost.js";
import {createNavigation} from "./components/nav.js";
import {createFilter} from "./components/filter.js";
import {createSorting} from "./components/sorting.js";
import {createEditForm} from "./components/edit-form.js";
import {createDaysList} from "./components/days-list.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, createInfo(), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, createCost(), `beforeend`);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, createNavigation(), `beforeend`);
render(tripControls, createFilter(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEditForm(), `beforeend`);
render(tripEvents, createDaysList(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, createDay(), `beforeend`);

const day = tripDays.querySelector(`.day`);
const tripEventsList = day.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsList, createEvent(), `beforeend`);
}


