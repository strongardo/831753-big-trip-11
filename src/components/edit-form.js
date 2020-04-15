import {TRANSFER_TYPES, ACTIVITY_TYPES} from "../const.js";
import {changeFormat} from "../utils.js";

export const createEditForm = (event) => {

  const createTimeMarkup = (time) => {
    const year = time.getFullYear().toString().slice(2);
    return (
      `${changeFormat(time.getDate())}/${changeFormat(time.getMonth())}/${year} ${changeFormat(time.getHours())}:${changeFormat(time.getMinutes())}`
    );
  };

  const createTypesMarkup = (array) => {
    return array.map((it) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}">
          <label class="event__type-label  event__type-label--${it}" for="event-type-${it}-1">${it}</label>
        </div>`
      );
    }).join(`\n`);
  };

  const createCitiesOptionsMarkup = (array) => {
    return array.map((it) => {
      return (
        `<option value="${it}"></option>`
      );
    }).join(`\n`);
  };

  const createOffersMarkup = (array) => {
    return array.map((it) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.type}-1" type="checkbox" name="event-offer-${it.type}-1" checked>
          <label class="event__offer-label" for="event-offer-${it.type}-1">
            <span class="event__offer-title">${it.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  };

  const createOffersContainerMarkup = () => {
    if (event.offers.length) {
      return (
        `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOffersMarkup(event.offers)}
          </div>
        </section>`
      );
    } else {
      return ``;
    }
  };

  const createPhotosMarkup = (array) => {
    return array.map((it) => {
      return (
        `<img class="event__photo" src="${it}" alt="Event photo">`
      );
    }).join(`\n`);
  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="${event.type}">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${createTypesMarkup(TRANSFER_TYPES)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${createTypesMarkup(ACTIVITY_TYPES)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Bus to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createCitiesOptionsMarkup(event.someSities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${createTimeMarkup(event.startTime)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${createTimeMarkup(event.finishTime)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>

    <section class="event__details">

      ${createOffersContainerMarkup()}

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${event.info.description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${createPhotosMarkup(event.info.pictures)}
                  </div>
                </div>
              </section>
    </section>

  </form>`
  );
};
