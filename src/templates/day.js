import {MONTHS} from "../const.js";

export const createDayTemplate = (number, date) => {

  const dayNumber = (number) ? number : ``;
  const month = (date) ? MONTHS[date.getMonth()] : ``;
  const day = (date) ? date.getDate() : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="">${month} ${day}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
