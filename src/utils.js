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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
