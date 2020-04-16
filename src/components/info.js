import {MONTHS, INDEX_FOR_FIRST_EVENT, INDEX_FOR_SECOND_EVENT, CITIES_FOR_INFO_QUANTITY} from "../const.js";

export const createInfo = (events) => {

  const getCities = () => {
    const firstCity = events[INDEX_FOR_FIRST_EVENT].destination;
    const secondCity = events[INDEX_FOR_SECOND_EVENT].destination;
    const lastCity = events[events.length - 1].destination;

    if (events.length > CITIES_FOR_INFO_QUANTITY) {
      return `${firstCity} — … — ${lastCity}`;
    } else {
      return `${firstCity} — ${secondCity} — ${lastCity}`;
    }
  };

  const getDates = () => {

    const firstDate = events[INDEX_FOR_FIRST_EVENT].startTime;
    const lastDate = events[events.length - 1].startTime;

    return `${MONTHS[firstDate.getMonth()]} ${firstDate.getDate()} — ${MONTHS[lastDate.getMonth()]} ${lastDate.getDate()}`;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      <h1 class="trip-info__title">${getCities()}</h1>
      <p class="trip-info__dates">${getDates()}</p>
      </div>
    </section>`
  );
};
