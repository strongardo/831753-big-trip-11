import {START_INDEX_FOR_EVENTS} from "./const.js";
import InfoComponent from "./components/info.js";
import CostComponent from "./components/cost.js";
import NavComponent from "./components/nav.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import EventEditComponent from "./components/event-edit.js";
import DaysListComponent from "./components/days-list.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import NoEventsComponent from "./components/no-events.js";
import {render} from "./utils.js";
import {generateEvents} from "./mock/event.js";

const events = generateEvents();

const renderHeader = () => {
  const tripMain = document.querySelector(`.trip-main`);

  const infoComponent = new InfoComponent(events);
  const costComponent = new CostComponent(events);
  const navComponent = new NavComponent();
  const filterComponent = new FilterComponent();

  const infoElement = infoComponent.getElement();
  const costElement = costComponent.getElement();
  const navElement = navComponent.getElement();
  const filterElement = filterComponent.getElement();

  render(tripMain, infoElement, `afterbegin`);

  const tripInfo = tripMain.querySelector(`.trip-info`);
  render(tripInfo, costElement, `beforeend`);

  const tripControls = tripMain.querySelector(`.trip-controls`);
  render(tripControls, navElement, `beforeend`);
  render(tripControls, filterElement, `beforeend`);
};

const renderNoEvents = () => {
  const tripEvents = document.querySelector(`.trip-events`);
  const noEventsComponent = new NoEventsComponent();
  const noEventsElement = noEventsComponent.getElement();
  render(tripEvents, noEventsElement, `beforeend`);
};

const renderContent = () => {
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

  const tripEvents = document.querySelector(`.trip-events`);

  const sortComponent = new SortComponent();
  const daysListComponent = new DaysListComponent();

  const sortElement = sortComponent.getElement();
  const daysListElement = daysListComponent.getElement();

  render(tripEvents, sortElement, `beforeend`);
  render(tripEvents, daysListElement, `beforeend`);

  const tripDays = tripEvents.querySelector(`.trip-days`);

  days.forEach((it, i) => {
    const dayComponent = new DayComponent(i + 1, it); // Номер дня не может быть нулем, поэтому +1
    const dayElement = dayComponent.getElement();
    render(tripDays, dayElement, `beforeend`);

    const currentEvents = events.filter((item) => {
      return item.startTime.getDate() === it.getDate();
    });

    const day = tripDays.querySelectorAll(`.day`)[i];
    const tripEventsList = day.querySelector(`.trip-events__list`);

    currentEvents.forEach((currentEvent) => {
      const eventComponent = new EventComponent(currentEvent);
      const eventElement = eventComponent.getElement();
      const eventEditComponent = new EventEditComponent(currentEvent);
      const eventEditElement = eventEditComponent.getElement();
      const openEventEditButton = eventElement.querySelector(`.event__rollup-btn`);
      const closeEventEditButton = eventEditElement.querySelector(`.event__reset-btn`);

      const onOpenEventEditButtonClick = () => {
        tripEventsList.replaceChild(eventEditElement, eventElement);
      };

      const onEventEditElementSubmit = (evt) => {
        evt.preventDefault();
        tripEventsList.replaceChild(eventElement, eventEditElement);
      };

      const onCloseEventEditButtonClick = () => {
        tripEventsList.replaceChild(eventElement, eventEditElement);
      };

      openEventEditButton.addEventListener(`click`, onOpenEventEditButtonClick);
      eventEditElement.addEventListener(`submit`, onEventEditElementSubmit);
      closeEventEditButton.addEventListener(`click`, onCloseEventEditButtonClick);

      render(tripEventsList, eventElement, `beforeend`);
    });
  });
};

renderHeader();

if (events.length) {
  renderContent();
} else {
  renderNoEvents();
}


