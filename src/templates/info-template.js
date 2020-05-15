import {MONTHS, INDEX_FOR_FIRST_EVENT, INDEX_FOR_SECOND_EVENT, CITIES_FOR_INFO_QUANTITY} from "../const.js";

export const createInfoTemplate = (events) => {
  if (events.length) {
    const getCities = () => {
      const firstCity = events[INDEX_FOR_FIRST_EVENT].destination.name;
      const secondCity = events[INDEX_FOR_SECOND_EVENT].destination.name;
      const lastCity = events[events.length - 1].destination.name;

      if (events.length > CITIES_FOR_INFO_QUANTITY) {
        return `${firstCity} — … — ${lastCity}`;
      } else {
        return `${firstCity} — ${secondCity} — ${lastCity}`;
      }
    };

    const getDates = () => {

      const firstDate = events[INDEX_FOR_FIRST_EVENT].dateFrom;
      const lastDate = events[events.length - 1].dateFrom;

      const firstDateMonth = MONTHS[firstDate.getMonth()];
      const firstDateDay = firstDate.getDate();
      const lastDateMonth = MONTHS[lastDate.getMonth()];
      const lastDateDay = lastDate.getDate();

      return `${firstDateMonth} ${firstDateDay} — ${lastDateMonth} ${lastDateDay}`;
    };

    const cities = getCities();
    const dates = getDates();

    return (
      `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      <h1 class="trip-info__title">${cities}</h1>
      <p class="trip-info__dates">${dates}</p>
      </div>
    </section>`
    );
  } else {
    return `<section class="trip-main__trip-info  trip-info"></section>`;
  }
};
