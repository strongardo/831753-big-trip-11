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
    const minutes = balance % 60;
    return `${changeFormat(days)}D ${changeFormat(hours)}H ${changeFormat(minutes)}M`;
  } else if (value > 59) {
    const hours = Math.round(value / 60);
    const minutes = value % 60;
    return `${changeFormat(hours)}H ${changeFormat(minutes)}M`;
  } else {
    return `${changeFormat(value)}M`;
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
