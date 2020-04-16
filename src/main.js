import {START_INDEX_FOR_EVENTS, START_INDEX_FOR_NEXT_EVENTS} from "./const.js";
import {createInfo} from "./components/info.js";
import {createCost} from "./components/cost.js";
import {createNavigation} from "./components/nav.js";
import {createFilter} from "./components/filter.js";
import {createSorting} from "./components/sorting.js";
import {createEditForm} from "./components/edit-form.js";
import {createDaysList} from "./components/days-list.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";
import {generateEvents} from "./mock/event.js";

const events = generateEvents();
const nextEvents = events.slice(START_INDEX_FOR_NEXT_EVENTS);

const getDays = () => {
  let currentDay = events[START_INDEX_FOR_EVENTS].startTime.getDate();
  const days = [events[START_INDEX_FOR_EVENTS].startTime];

  for (const item of events) {
    if (item.startTime.getDate() !== currentDay) {
      days.push(item.startTime);
      currentDay = item.startTime.getDate();
    }
  }

  return days;
};

const days = getDays();

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, createInfo(events), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, createCost(events), `beforeend`);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, createNavigation(), `beforeend`);
render(tripControls, createFilter(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEditForm(events[START_INDEX_FOR_EVENTS]), `beforeend`);
render(tripEvents, createDaysList(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);

days.forEach((it, i) => {
  render(tripDays, createDay(i + 1, it), `beforeend`); // Номер дня не может быть нулем, поэтому +1

  const currentEvents = nextEvents.filter((item) => {
    return item.startTime.getDate() === it.getDate();
  });

  const day = tripDays.querySelectorAll(`.day`)[i];
  const tripEventsList = day.querySelector(`.trip-events__list`);

  currentEvents.forEach((currentEvent) => {
    render(tripEventsList, createEvent(currentEvent), `beforeend`);
  });
});
