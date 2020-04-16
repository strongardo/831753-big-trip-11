import {MONTHS} from "../const.js";

export const createDay = (number, date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number}</span>
        <time class="day__date" datetime="">${MONTHS[date.getMonth()]} ${date.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
