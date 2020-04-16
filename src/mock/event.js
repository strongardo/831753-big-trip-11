const DESCRIPTION_PICTURES_URL = `http://picsum.photos/248/152`;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const sliceRandomArray = (array, elements) => {
  const limiter1 = getRandomIntegerNumber(0, array.length - elements);
  const limiter2 = getRandomIntegerNumber(limiter1, limiter1 + elements);
  return array.slice(limiter1, limiter2);
};

const generateRandomArray = (min, max, filler) => {
  const randomArray = [];
  const numberOfElements = getRandomIntegerNumber(min, max);
  for (let i = 0; i < numberOfElements; i++) {
    randomArray.push(filler);
  }
  return randomArray;
};

const getRandomDate = (duringDate = new Date()) => {
  const diffValue = getRandomIntegerNumber(0, 8);

  duringDate.setDate(duringDate.getDate() + diffValue);

  return duringDate;
};


const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const cities = [`New York`, `Los Angeles`, `Chicago`, `Houston`, `Phoenix`, `Philadelphia`, `San Antonio`, `San Diego`, `Dallas`, `San Jose`, `Austin`, `Jacksonville`, `Fort Worth`, `Columbus`, `San Francisco`, `Charlotte`, `Indianapolis`, `Seattle`, `Denver`, `Washington`];
const offers = [
  {
    type: `car`,
    name: `Rent a car`,
    price: 40,
  },
  {
    type: `tickets`,
    name: `Book tickets`,
    price: 120,
  },
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 5,
  },
  {
    type: `comfort`,
    name: `Switch to comfort`,
    price: 50,
  },
  {
    type: `uber`,
    name: `Order Uber`,
    price: 50,
  },
];

const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus].`];

const generateDurations = () => {
  const durations = [];
  const numberOfElements = getRandomIntegerNumber(15, 20);
  for (let i = 0; i < numberOfElements; i++) {
    durations.push(getRandomIntegerNumber(1, 2500));
  }
  return durations;
};

const createTimes = () => {
  let startTime = getRandomDate();
  let endTime = null;

  return generateDurations().map((it, i) => {
    startTime = (i !== 0) ? new Date(endTime) : startTime;
    endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + it);

    return {
      duration: it,
      startTime,
      endTime,
    };
  });
};

const generateEvents = () => {
  return createTimes().map((it) => {

    return {
      type: getRandomArrayItem(types),
      destination: getRandomArrayItem(cities),
      someSities: sliceRandomArray(cities, 4),
      duration: it.duration,
      startTime: it.startTime,
      finishTime: it.endTime,
      price: getRandomIntegerNumber(0, 10000),

      offers: offers.slice(getRandomIntegerNumber(0, 5)),

      info: {
        description: sliceRandomArray(descriptions, 5).join(` `),
        pictures: generateRandomArray(1, 10, DESCRIPTION_PICTURES_URL),
      },

    };
  });
};

export {generateEvents, types};

