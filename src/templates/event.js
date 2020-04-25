import {TYPES, START_INDEX_FOR_ACTIVITY_TYPES, START_INDEX_FOR_OFFERS, LAST_INDEX_FOR_OFFERS} from "../const.js";
import {changeFormat, changeTimeFormat} from "../utils/common.js";

const getHeadingPretext = (type) => {
  const isCurrentElement = (it) => {
    return it === type;
  };
  return (TYPES.findIndex(isCurrentElement) < START_INDEX_FOR_ACTIVITY_TYPES) ? `to` : `in`;
};

const createTimeMarkup = (time) => {
  const hour = changeFormat(time.getHours());
  const minute = changeFormat(time.getMinutes());
  return `${hour}:${minute}`;
};

const createOffersMarkup = (offers) => {
  if (offers.length) {

    return offers.slice(START_INDEX_FOR_OFFERS, LAST_INDEX_FOR_OFFERS).map((offer) => {

      const offerName = offer.name;
      const offerPrice = offer.price;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offerName}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
        </li>`
      );
    })
      .join(`\n`);
  } else {
    return ``;
  }
};

export const createEventTemplate = (event) => {

  const type = event.type;
  const headingPretext = getHeadingPretext(type);
  const destination = event.destination;
  const startTimeMarkup = createTimeMarkup(event.startTime);
  const finishTimeMarkup = createTimeMarkup(event.finishTime);
  const duration = changeTimeFormat(event.duration);
  const price = event.price;
  const offersMarkup = createOffersMarkup(event.offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type}">
      </div>
      <h3 class="event__title">${type} ${headingPretext} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="">${startTimeMarkup}</time>
          &mdash;
          <time class="event__end-time" datetime="">${finishTimeMarkup}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersMarkup}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};