import {TRANSFER_TYPES, ACTIVITY_TYPES} from "../const.js";
import {changeFormat, capitalizeFirstLetter, getHeadingPretext} from "../utils/common.js";

const getFavoritecheckBoxCondition = (isFavorite) => {
  return (isFavorite) ? `checked` : ``;
};

const createTimeMarkup = (time) => {

  const day = changeFormat(time.getDate());
  const monthValue = changeFormat(time.getMonth());
  const year = time.getFullYear().toString().slice(2);
  const hourValue = changeFormat(time.getHours());
  const minute = changeFormat(time.getMinutes());

  return (
    `${day}/${monthValue}/${year} ${hourValue}:${minute}`
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

const createCitiesOptionsMarkup = (destinations) => {
  return destinations.map((city) => {
    return (
      `<option value="${city.name}"></option>`
    );
  }).join(`\n`);
};

const createOffersMarkup = (array, type) => {
  return array.map((it) => {

    const name = it.title;
    const price = it.price;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}-1" checked>
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createPhotosMarkup = (pictures) => {
  return pictures.map((picture) => {
    const url = picture.src;
    const description = picture.description;

    return (
      `<img class="event__photo" src="${url}" alt="${description}">`
    );
  }).join(`\n`);
};

const createOffersContainerMarkup = (type, event) => {
  if (event.offers.length) {

    const offersMarkup = createOffersMarkup(event.offers, type);

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>`
    );
  } else {
    return ``;
  }
};

const createExtraMarkup = (favoritecheckBoxCondition) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${favoritecheckBoxCondition}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  );
};

export const createFormTemplate = (event, isThisNewEvent, destinations) => {
  const price = event.basePrice;
  const type = event.type;
  const capitalizeFirstLetterType = capitalizeFirstLetter(type);
  const headingPretext = getHeadingPretext(type);
  const destination = event.destination.name;
  const transferTypesMarkup = createTypesMarkup(TRANSFER_TYPES);
  const activityTypesMarkup = createTypesMarkup(ACTIVITY_TYPES);
  const citiesOptionsMarkup = createCitiesOptionsMarkup(destinations);
  const dateFrom = event.dateFrom;
  const dateTo = event.dateTo;
  const dateFromMarkup = createTimeMarkup(dateFrom);
  const dateToMarkup = createTimeMarkup(dateTo);
  const offersContainerMarkup = createOffersContainerMarkup(type, event);
  const description = event.destination.description;
  const pictures = event.destination.pictures;
  const photosMarkup = createPhotosMarkup(pictures);
  const deleteBtnText = (isThisNewEvent) ? `Cancel` : `Delete`;
  const favoritecheckBoxCondition = getFavoritecheckBoxCondition(event.isFavorite);
  const extraMarkup = (isThisNewEvent) ? `` : createExtraMarkup(favoritecheckBoxCondition);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${transferTypesMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${activityTypesMarkup}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeFirstLetterType} ${headingPretext}
        </label>
        <input id="event-destination-1" class="event__input  event__input--destination" name="event-destination" list="destination-list-1" value="${destination}">
        <datalist id="destination-list-1">
          ${citiesOptionsMarkup}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" datetime="${dateFrom}" value="${dateFromMarkup}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" datetime="${dateTo}" value="${dateToMarkup}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" pattern="^[0-9]+$" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${deleteBtnText}</button>

      ${extraMarkup}

      </header>

    <section class="event__details">

      ${offersContainerMarkup}

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${photosMarkup}
                  </div>
                </div>
              </section>
    </section>

  </form>`
  );
};
