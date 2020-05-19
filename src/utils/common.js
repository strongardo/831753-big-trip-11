import {TYPES, START_INDEX_FOR_ACTIVITY_TYPES} from "../const.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const changeFormat = (value) => {
  return (value > 9) ? String(value) : `0${value}`;
};

export const changeTimeFormat = (value) => {
  if (value >= 1440) {
    const days = Math.round(value / 1440);
    const balance = value % 1440;
    const hours = Math.round(balance / 60);
    const minutes = Math.round(balance % 60);
    return `${changeFormat(days)}D ${changeFormat(hours)}H ${changeFormat(minutes)}M`;
  } else if (value > 59) {
    const hours = Math.round(value / 60);
    const minutes = Math.round(value % 60);
    return `${changeFormat(hours)}H ${changeFormat(minutes)}M`;
  } else {
    const minutes = Math.round(changeFormat(value));
    return `${minutes}M`;
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getHeadingPretext = (type) => {
  const isCurrentElement = (it) => {
    return it === type;
  };
  return (TYPES.findIndex(isCurrentElement) < START_INDEX_FOR_ACTIVITY_TYPES) ? `to` : `in`;
};

export const calculateCostOfType = (events, type) => {
  let cost = 0;
  events.forEach((event) => {
    if (event.type === type) {
      cost += event.basePrice;
    }
  });
  return cost;
};

export const calculateAmountOfType = (events, type) => {
  let amount = 0;
  events.forEach((event) => {
    if (event.type === type) {
      amount++;
    }
  });
  return amount;
};

export const calculateDurationOfType = (events, type) => {
  let duration = 0;
  events.forEach((event) => {
    if (event.type === type) {
      const dateFrom = event.dateFrom;
      const dateTo = event.dateTo;
      const difference = Math.round((dateTo - dateFrom) / 3600000);
      duration += difference;
    }
  });
  return duration;
};
