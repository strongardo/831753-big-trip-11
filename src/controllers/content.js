import {START_INDEX_FOR_EVENTS} from "../const.js";
import SortComponent from "../components/sort.js";
import EventEditComponent from "../components/event-edit.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import EventComponent from "../components/event.js";
import NoEventsComponent from "../components/no-events.js";
import {render, replace} from "../utils/dom.js";

const getDays = (events) => {
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

export default class ContentController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();
  }

  render(events) {
    const renderNoEvents = () => {
      render(this._container, this._noEventsComponent, `beforeend`);
    };

    const renderContent = () => {

      render(this._container, this._sortComponent, `beforeend`);
      render(this._container, this._daysListComponent, `beforeend`);

      const tripDays = this._container.querySelector(`.trip-days`);

      const days = getDays(events);

      days.forEach((it, i) => {
        const dayComponent = new DayComponent(i + 1, it); // Номер дня не может быть нулем, поэтому +1
        render(tripDays, dayComponent, `beforeend`);

        const currentEvents = events.filter((item) => {
          return item.startTime.getDate() === it.getDate();
        });

        const day = tripDays.querySelectorAll(`.day`)[i];
        const tripEventsList = day.querySelector(`.trip-events__list`);

        currentEvents.forEach((currentEvent) => {
          const eventComponent = new EventComponent(currentEvent);
          const eventEditComponent = new EventEditComponent(currentEvent);

          const replaceEventToEdit = () => {
            replace(eventEditComponent, eventComponent);
          };

          const replaceEditToEvent = () => {
            replace(eventComponent, eventEditComponent);
          };

          const removeOnEscKeyDownHandler = () => {
            document.removeEventListener(`keydown`, onEscKeyDown);
          };

          const onEscKeyDown = (evt) => {
            const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

            if (isEscKey) {
              replaceEditToEvent();
              removeOnEscKeyDownHandler();
            }
          };

          const onSetEditButtonClick = () => {
            replaceEventToEdit();
            document.addEventListener(`keydown`, onEscKeyDown);
          };

          const onFormSubmit = (evt) => {
            evt.preventDefault();
            replaceEditToEvent();
            removeOnEscKeyDownHandler();
          };

          const onCancelButtonClick = () => {
            replaceEditToEvent();
            removeOnEscKeyDownHandler();
          };

          eventComponent.setEditButtonClickHandler(onSetEditButtonClick);
          eventEditComponent.setFormSubmitHandler(onFormSubmit);
          eventEditComponent.setCancelButtonClickHandler(onCancelButtonClick);

          render(tripEventsList, eventComponent, `beforeend`);
        });
      });
    };

    if (events.length) {
      renderContent();
    } else {
      renderNoEvents();
    }
  }
}
