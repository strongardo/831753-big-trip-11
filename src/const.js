export const MILLISECONDS_IN_ONE_MINUTE = 60000;

export const SERVER_URL = `https://11.ecmascript.pages.academy/big-trip/`;

export const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

export const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
export const TRANSFER_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY_TYPES = [`check-in`, `sightseeing`, `restaurant`];

export const Index = {
  START_FOR_EVENTS: 0,
  START_FOR_DAYS: 1,
  START_FOR_ACTIVITY_TYPES: 7,
  START_FOR_OFFERS: 0,
  LAST_FOR_OFFERS: 3,
  FOR_MISSING_ITEM: -1,
};

export const HttpStatus = {
  START_SUCCESS: 200,
  START_UNSUCCESS: 300,
};

export const HttpMethod = {
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

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
