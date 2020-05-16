export const START_INDEX_FOR_EVENTS = 0;
export const START_INDEX_FOR_NEXT_EVENTS = 1;
export const START_INDEX_FOR_ACTIVITY_TYPES = 7;
export const START_INDEX_FOR_OFFERS = 0;
export const LAST_INDEX_FOR_OFFERS = 2;
export const INDEX_FOR_FIRST_EVENT = 0;
export const INDEX_FOR_SECOND_EVENT = 1;
export const CITIES_FOR_INFO_QUANTITY = 3;

export const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

export const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
export const TRANSFER_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY_TYPES = [`check-in`, `sightseeing`, `restaurant`];

export const SortType = {
  TIME: `time`,
  PRICE: `price`,
  DEFAULT: `default`,
};

export const FilterType = {
  FUTURE: `future`,
  PAST: `past`,
  DEFAULT: `default`,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const eventTemplate = {
  "basePrice": 222,
  "dateFrom": ``,
  "dateTo": ``,
  "destination": {
    "description": `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
    "name": `Chamonix`,
    "pictures": [{
      "src": `http://picsum.photos/300/200?r=0.0762563005163317`,
      "description": `Chamonix parliament building`,
    }],
  },
  "isFavorite": false,
  "offers": [
    {
      "title": `Choose meal`,
      "price": 180
    }, {
      "title": `Upgrade to comfort class`,
      "price": 50
    }
  ],
  "type": `taxi`,
};
