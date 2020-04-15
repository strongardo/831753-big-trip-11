const changeFormat = (value) => {
  return (value > 9) ? value : `0${value}`;
};

const changeTimeFormat = (value) => {
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

export {changeFormat, changeTimeFormat};
