const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const sliceRandomArray = (array, elements) => {
  const limiter1 = getRandomIntegerNumber(0, array.length - elements);
  const limiter2 = getRandomIntegerNumber(limiter1 + 1, limiter1 + elements - 1);
  return array.slice(limiter1, limiter2);
};

// const generateRandomArray = (min, max, filler) => {
//   const randomArray = [];
//   const numberOfElements = getRandomIntegerNumber(min, max);
//   for (let i = 0; i < numberOfElements; i++) {
//     randomArray.push(filler);
//   }
//   return randomArray;
// };

const types = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const cities = [`New York`, `Los Angeles`, `Chicago`, `Houston`, `Phoenix`, `Philadelphia`, `San Antonio`, `San Diego`, `Dallas`, `San Jose`, `Austin`, `Jacksonville`, `Fort Worth`, `Columbus`, `San Francisco`, `Charlotte`, `Indianapolis`, `Seattle`, `Denver`, `Washington`];

// const offers = [
//   {
//     type: `car`,
//     name: `Rent a car`,
//     price: 40,
//   },
//   {
//     type: `tickets`,
//     name: `Book tickets`,
//     price: 120,
//   },
//   {
//     type: `luggage`,
//     name: `Add luggage`,
//     price: 5,
//   },
//   {
//     type: `comfort`,
//     name: `Switch to comfort`,
//     price: 50,
//   },
//   {
//     type: `uber`,
//     name: `Order Uber`,
//     price: 50,
//   },
// ];

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

const getDateFrom = () => {
  const date = new Date();
  const diffValue = getRandomIntegerNumber(10, 2880);

  const diceNumber = getRandomIntegerNumber(0, 10);

  if (diceNumber < 5) {
    date.setMinutes(date.getMinutes() - diffValue);
  } else {
    date.setMinutes(date.getMinutes() + diffValue);
  }

  return date;
};

const getDateTo = (dateFrom) => {
  const date = new Date(dateFrom);
  const diffValue = getRandomIntegerNumber(10, 2880);
  date.setMinutes(date.getMinutes() + diffValue);
  return date;
};

const getPictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomIntegerNumber(1, 10); i++) {
    pictures.push(
        {
          "src": `https://picsum.photos/200`,
          "description": sliceRandomArray(descriptions, 2).join(` `),
        }
    );
  }
  return pictures;
};

export const generateEvents = () => {
  const events = cities.map((item, index) => {

    const dateFrom = getDateFrom();
    const dateTo = getDateTo(dateFrom);

    return {
      "base_price": getRandomIntegerNumber(0, 1000),
      "date_from": dateFrom,
      "date_to": dateTo,
      "destination": {
        "description": sliceRandomArray(descriptions, 5).join(` `),
        "name": item,
        "pictures": getPictures(),
      },
      "id": index,
      "is_favorite": false,
      "offers": [
        {
          "title": `Choose meal`,
          "price": 180
        }, {
          "title": `Upgrade to comfort class`,
          "price": 50
        }
      ],
      "type": getRandomArrayItem(types),
    };
  });


  return events.sort((a, b) => a.date_from - b.date_from);

};


