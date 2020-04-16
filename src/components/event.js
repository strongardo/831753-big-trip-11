import {TYPES, START_INDEX_FOR_ACTIVITY_TYPES, START_INDEX_FOR_OFFERS, LAST_INDEX_FOR_OFFERS} from "../const.js";
import {changeFormat, changeTimeFormat} from "../utils.js";

const getHeadingPretext = (type) => {
  const isCurrentElement = (it) => {
    return it === type;
  };
  return (TYPES.findIndex(isCurrentElement) < START_INDEX_FOR_ACTIVITY_TYPES) ? `to` : `in`;
};

const createTimeMarkup = (time) => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  return `${changeFormat(hour)}:${changeFormat(minute)}`;
};

const createOffersMarkup = (offers) => {
  if (offers.length) {
    return offers.slice(START_INDEX_FOR_OFFERS, LAST_INDEX_FOR_OFFERS).map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
      );
    })
      .join(`\n`);
  } else {
    return ``;
  }
};

export const createEvent = (event) => {

  return (
    `<li class="trip-events__item">
      <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="${event.type}">
      </div>
      <h3 class="event__title">${event.type} ${getHeadingPretext(event.type)} ${event.destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${createTimeMarkup(event.startTime)}">${createTimeMarkup(event.startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${createTimeMarkup(event.finishTime)}">${createTimeMarkup(event.finishTime)}</time>
        </p>
        <p class="event__duration">${changeTimeFormat(event.duration)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${event.price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersMarkup(event.offers)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
