import {TYPES, TRANSFER_TYPES} from "../const.js";
import AbstractComponent from "./abstract-component.js";
import {createStatisticTemplate} from "../templates/statistic-template.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {calculateCostOfType, calculateAmountOfType, calculateDurationOfType} from "../utils/common.js";

export default class Statistic extends AbstractComponent {
  constructor(eventsModel) {
    super();

    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  _renderMoneyChart(moneyCtx) {
    const events = this._eventsModel.getAllEvents();
    const data = TYPES.map((type) => {
      return calculateCostOfType(events, type);
    });

    return new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK-IN`, `SIGHTSEEING`, `RESTAURANT`],
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTransportChart(transportCtx) {
    const events = this._eventsModel.getAllEvents();
    const data = TRANSFER_TYPES.map((type) => {
      return calculateAmountOfType(events, type);
    });

    return new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`],
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTimeChart(timeSpendCtx) {
    const events = this._eventsModel.getAllEvents();
    const data = TYPES.map((type) => {
      return calculateDurationOfType(events, type);
    });

    return new Chart(timeSpendCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK-IN`, `SIGHTSEEING`, `RESTAURANT`],
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val} H`
          }
        },
        title: {
          display: true,
          text: `TIME SPENT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 10;
    transportCtx.height = BAR_HEIGHT * 7;
    timeSpendCtx.height = BAR_HEIGHT * 10;

    this._resetCharts();

    this._moneyChart = this._renderMoneyChart(moneyCtx);
    this._transportChart = this._renderTransportChart(transportCtx);
    this._timeChart = this._renderTimeChart(timeSpendCtx);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeChart) {
      this._timeChart.destroy();
      this._timeChart = null;
    }
  }
}
