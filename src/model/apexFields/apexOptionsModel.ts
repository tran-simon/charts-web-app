import {
  ListOptionField,
  BoolOptionField,
  NumberOptionField,
  Options,
  SelectOptionField,
  TextOptionField,
} from '../optionModel';
import { ApexOptions } from 'apexcharts';
import dataLabels from '../../generated-sources/dataLabels';

const apexOptionsModel: Options<ApexOptions> = {
  annotations: {
    position: new SelectOptionField({
      front: {
        labelId: 'ChartContext.annotations.position.option.front',
        value: 'front',
      },
      back: {
        labelId: 'ChartContext.annotations.position.option.back',
        value: 'back',
      },
    }),
    // yaxis: new ArrayOptionField(),
    // xaxis: new ArrayOptionField(),
    // points: new ArrayOptionField(),
    // texts: new ArrayOptionField(),
    // images: new ArrayOptionField(),
  },
  chart: {
    width: null,
    height: null,
    type: null,
    foreColor: undefined,
    fontFamily: undefined,
    background: undefined,
    offsetX: undefined,
    offsetY: undefined,
    dropShadow: {
      enabled: new BoolOptionField(),
      color: new ListOptionField(new TextOptionField(), true),
    },
    events: undefined,
    brush: undefined,
    id: undefined,
    group: undefined,
    locales: undefined,
    defaultLocale: undefined,
    parentHeightOffset: undefined,
    redrawOnParentResize: undefined,
    redrawOnWindowResize: undefined,
    sparkline: undefined,
    stacked: undefined,
    stackType: undefined,
    toolbar: undefined,
    zoom: undefined,
    selection: undefined,
    animations: undefined,
  },
  colors: new ListOptionField(new TextOptionField()),
  dataLabels: dataLabels,
  fill: undefined,
  forecastDataPoints: undefined,
  grid: undefined,
  // labels: new ArrayOptionField(new TextOptionField()), // TODO: This causes a bug with line charts
  legend: undefined,
  markers: undefined,
  noData: undefined,
  plotOptions: undefined,
  // responsive: new ArrayOptionField(),
  series: null,
  states: undefined,
  stroke: undefined,
  subtitle: undefined,
  theme: undefined,
  title: {
    text: new TextOptionField(),
    align: new SelectOptionField({
      left: {
        labelId: 'ChartContext.title.align.option.left',
        value: 'left',
      },
      center: {
        labelId: 'ChartContext.title.align.option.center',
        value: 'center',
      },
      right: {
        labelId: 'ChartContext.title.align.option.right',
        value: 'right',
      },
    }),
    margin: new NumberOptionField(),
    offsetX: new NumberOptionField(),
    offsetY: new NumberOptionField(),
    floating: new BoolOptionField(),
    //...//
    style: {
      fontSize: new TextOptionField(),
      fontFamily: new TextOptionField(),
      fontWeight: new TextOptionField(),
      color: new TextOptionField(),
    },
  },
  tooltip: undefined,
  xaxis: {
    type: new SelectOptionField({
      category: {
        labelId: 'ChartContext.xaxis.type.option.category',
        value: 'category',
      },
      datetime: {
        labelId: 'ChartContext.xaxis.type.option.datetime',
        value: 'datetime',
      },
      numeric: {
        labelId: 'ChartContext.xaxis.type.option.numeric',
        value: 'numeric',
      },
    }),
    categories: new ListOptionField(new TextOptionField()),
    tickAmount: new NumberOptionField(), // TODO(https://github.com/tran-simon/charts-web-app/issues/2): support string tickAmount: 'dataPoints'
    tickPlacement: new SelectOptionField({
      between: {
        labelId: 'ChartContext.xaxis.tickPlacement.option.between',
        value: 'between',
      },
      on: {
        labelId: 'ChartContext.xaxis.tickPlacement.option.on',
        value: 'on',
      },
    }),
    min: new NumberOptionField(),
    max: new NumberOptionField(),
    range: new NumberOptionField(),
    floating: new BoolOptionField(),
    decimalsInFloat: new NumberOptionField(),
    overwriteCategories: new ListOptionField(new TextOptionField()),
    position: new SelectOptionField({
      bottom: {
        labelId: 'ChartContext.xaxis.position.option.bottom',
        value: 'bottom',
      },
      top: {
        labelId: 'ChartContext.xaxis.position.option.top',
        value: 'top',
      },
    }),
    labels: {
      show: new BoolOptionField(),
      rotate: new NumberOptionField(),
      rotateAlways: new BoolOptionField(),
      hideOverlappingLabels: new BoolOptionField(),
      showDuplicates: new BoolOptionField(),
      trim: new BoolOptionField(),
      minHeight: new NumberOptionField(),
      maxHeight: new NumberOptionField(),
      style: {
        colors: new ListOptionField(new TextOptionField(), true),
        fontSize: new TextOptionField(),
        fontFamily: new TextOptionField(),
        fontWeight: new TextOptionField(),
        cssClass: new TextOptionField(),
      },
      offsetX: new NumberOptionField(),
      offsetY: new NumberOptionField(),
      format: new TextOptionField(),
      formatter: null, // TODO(https://github.com/tran-simon/charts-web-app/issues/1): Support formatter custom functions
      datetimeUTC: new BoolOptionField(),
      datetimeFormatter: {
        year: new TextOptionField(),
        month: new TextOptionField(),
        day: new TextOptionField(),
        hour: new TextOptionField(),
      },
    },
    axisBorder: {
      show: new BoolOptionField(),
      color: new TextOptionField(),
      // height: new NumberOptionField(),
      // width: new TextOptionField(),
      offsetX: new NumberOptionField(),
      offsetY: new NumberOptionField(),
    },
    axisTicks: {
      show: new BoolOptionField(),
      borderType: new SelectOptionField({
        solid: {
          labelId: 'ChartContext.xaxis.axisTicks.borderType.option.solid',
          value: 'solid',
        },
        dotted: {
          labelId: 'ChartContext.xaxis.axisTicks.borderType.option.dotted',
          value: 'dotted',
        },
      }),
      color: new TextOptionField(),
      height: new NumberOptionField(),
      offsetX: new NumberOptionField(),
      offsetY: new NumberOptionField(),
    },
    title: {
      text: new TextOptionField(),
      offsetX: new NumberOptionField(),
      offsetY: new NumberOptionField(),
      style: {
        color: new TextOptionField(),
        fontSize: new TextOptionField(),
        fontFamily: new TextOptionField(),
        fontWeight: new TextOptionField(),
        cssClass: new TextOptionField(),
      },
    },
    crosshairs: {
      show: new BoolOptionField(),
      width: new TextOptionField(), // TODO(https://github.com/tran-simon/charts-web-app/issues/2): support string 'tickWidth' or 'barWidth'
      position: new SelectOptionField({
        back: {
          labelId: 'ChartContext.xaxis.crosshairs.position.option.back',
          value: 'back',
        },
        front: {
          labelId: 'ChartContext.xaxis.crosshairs.position.option.front',
          value: 'front',
        },
      }),
      opacity: new NumberOptionField(),
      stroke: {
        color: new TextOptionField(),
        width: new NumberOptionField(),
        dashArray: new NumberOptionField(),
      },
      fill: {
        type: new SelectOptionField({
          solid: {
            labelId: 'ChartContext.xaxis.crosshairs.fill.type.option.solid',
            value: 'back',
          },
          gradient: {
            labelId: 'ChartContext.xaxis.crosshairs.fill.type.option.gradient',
            value: 'gradient',
          },
        }),
        color: new TextOptionField(),
        gradient: {
          colorFrom: new TextOptionField(),
          colorTo: new TextOptionField(),
          stops: new ListOptionField(new NumberOptionField()),
          opacityFrom: new NumberOptionField(),
          opacityTo: new NumberOptionField(),
        },
      },
      dropShadow: {
        enabled: new BoolOptionField(),
        top: new NumberOptionField(),
        left: new NumberOptionField(),
        blur: new NumberOptionField(),
        opacity: new NumberOptionField(),
      },
    },
    tooltip: {
      enabled: new BoolOptionField(),
      formatter: null, // TODO(https://github.com/tran-simon/charts-web-app/issues/1): Support formatter custom functions
      offsetY: new NumberOptionField(),
      style: {
        fontSize: new TextOptionField(),
        fontFamily: new TextOptionField(),
      },
    },
  },
};

export default apexOptionsModel;
