import {
  ListOptionField,
  BoolOptionField,
  Options,
  TextOptionField,
} from '../optionModel';
import { ApexOptions } from 'apexcharts';
import annotations from '../../generated-sources/annotations';
import dataLabels from '../../generated-sources/dataLabels';
import fill from '../../generated-sources/fill';
import forecastDataPoints from '../../generated-sources/forecastDataPoints';
import grid from '../../generated-sources/grid';
import legend from '../../generated-sources/legend';
import markers from '../../generated-sources/markers';
import noData from '../../generated-sources/noData';
import states from '../../generated-sources/states';
import stroke from '../../generated-sources/stroke';
import subtitle from '../../generated-sources/subtitle';
import theme from '../../generated-sources/theme';
import title from '../../generated-sources/title';
import tooltip from '../../generated-sources/tooltip';
import xaxis from '../../generated-sources/xaxis';

const apexOptionsModel: Options<ApexOptions> = {
  annotations,
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
  dataLabels,
  fill,
  forecastDataPoints,
  grid,
  // labels: new ArrayOptionField(new TextOptionField()), // TODO: This causes a bug with line charts
  legend,
  markers,
  noData,
  // plotOptions,
  // responsive: new ArrayOptionField(),
  series: null,
  states,
  stroke,
  subtitle,
  theme,
  title,
  tooltip,
  xaxis,
  // xaxis: {
  //   type: new SelectOptionField({
  //     category: {
  //       labelId: 'ChartContext.xaxis.type.option.category',
  //       value: 'category',
  //     },
  //     datetime: {
  //       labelId: 'ChartContext.xaxis.type.option.datetime',
  //       value: 'datetime',
  //     },
  //     numeric: {
  //       labelId: 'ChartContext.xaxis.type.option.numeric',
  //       value: 'numeric',
  //     },
  //   }),
  //   categories: new ListOptionField(new TextOptionField()),
  //   tickAmount: new NumberOptionField(), // TODO(https://github.com/tran-simon/charts-web-app/issues/2): support string tickAmount: 'dataPoints'
  //   tickPlacement: new SelectOptionField({
  //     between: {
  //       labelId: 'ChartContext.xaxis.tickPlacement.option.between',
  //       value: 'between',
  //     },
  //     on: {
  //       labelId: 'ChartContext.xaxis.tickPlacement.option.on',
  //       value: 'on',
  //     },
  //   }),
  //   min: new NumberOptionField(),
  //   max: new NumberOptionField(),
  //   range: new NumberOptionField(),
  //   floating: new BoolOptionField(),
  //   decimalsInFloat: new NumberOptionField(),
  //   overwriteCategories: new ListOptionField(new TextOptionField()),
  //   position: new SelectOptionField({
  //     bottom: {
  //       labelId: 'ChartContext.xaxis.position.option.bottom',
  //       value: 'bottom',
  //     },
  //     top: {
  //       labelId: 'ChartContext.xaxis.position.option.top',
  //       value: 'top',
  //     },
  //   }),
  //   labels: {
  //     show: new BoolOptionField(),
  //     rotate: new NumberOptionField(),
  //     rotateAlways: new BoolOptionField(),
  //     hideOverlappingLabels: new BoolOptionField(),
  //     showDuplicates: new BoolOptionField(),
  //     trim: new BoolOptionField(),
  //     minHeight: new NumberOptionField(),
  //     maxHeight: new NumberOptionField(),
  //     style: {
  //       colors: new ListOptionField(new TextOptionField(), true),
  //       fontSize: new TextOptionField(),
  //       fontFamily: new TextOptionField(),
  //       fontWeight: new TextOptionField(),
  //       cssClass: new TextOptionField(),
  //     },
  //     offsetX: new NumberOptionField(),
  //     offsetY: new NumberOptionField(),
  //     format: new TextOptionField(),
  //     formatter: null, // TODO(https://github.com/tran-simon/charts-web-app/issues/1): Support formatter custom functions
  //     datetimeUTC: new BoolOptionField(),
  //     datetimeFormatter: {
  //       year: new TextOptionField(),
  //       month: new TextOptionField(),
  //       day: new TextOptionField(),
  //       hour: new TextOptionField(),
  //     },
  //   },
  //   axisBorder: {
  //     show: new BoolOptionField(),
  //     color: new TextOptionField(),
  //     // height: new NumberOptionField(),
  //     // width: new TextOptionField(),
  //     offsetX: new NumberOptionField(),
  //     offsetY: new NumberOptionField(),
  //   },
  //   axisTicks: {
  //     show: new BoolOptionField(),
  //     borderType: new SelectOptionField({
  //       solid: {
  //         labelId: 'ChartContext.xaxis.axisTicks.borderType.option.solid',
  //         value: 'solid',
  //       },
  //       dotted: {
  //         labelId: 'ChartContext.xaxis.axisTicks.borderType.option.dotted',
  //         value: 'dotted',
  //       },
  //     }),
  //     color: new TextOptionField(),
  //     height: new NumberOptionField(),
  //     offsetX: new NumberOptionField(),
  //     offsetY: new NumberOptionField(),
  //   },
  //   title: {
  //     text: new TextOptionField(),
  //     offsetX: new NumberOptionField(),
  //     offsetY: new NumberOptionField(),
  //     style: {
  //       color: new TextOptionField(),
  //       fontSize: new TextOptionField(),
  //       fontFamily: new TextOptionField(),
  //       fontWeight: new TextOptionField(),
  //       cssClass: new TextOptionField(),
  //     },
  //   },
  //   crosshairs: {
  //     show: new BoolOptionField(),
  //     width: new TextOptionField(), // TODO(https://github.com/tran-simon/charts-web-app/issues/2): support string 'tickWidth' or 'barWidth'
  //     position: new SelectOptionField({
  //       back: {
  //         labelId: 'ChartContext.xaxis.crosshairs.position.option.back',
  //         value: 'back',
  //       },
  //       front: {
  //         labelId: 'ChartContext.xaxis.crosshairs.position.option.front',
  //         value: 'front',
  //       },
  //     }),
  //     opacity: new NumberOptionField(),
  //     stroke: {
  //       color: new TextOptionField(),
  //       width: new NumberOptionField(),
  //       dashArray: new NumberOptionField(),
  //     },
  //     fill: {
  //       type: new SelectOptionField({
  //         solid: {
  //           labelId: 'ChartContext.xaxis.crosshairs.fill.type.option.solid',
  //           value: 'back',
  //         },
  //         gradient: {
  //           labelId: 'ChartContext.xaxis.crosshairs.fill.type.option.gradient',
  //           value: 'gradient',
  //         },
  //       }),
  //       color: new TextOptionField(),
  //       gradient: {
  //         colorFrom: new TextOptionField(),
  //         colorTo: new TextOptionField(),
  //         stops: new ListOptionField(new NumberOptionField()),
  //         opacityFrom: new NumberOptionField(),
  //         opacityTo: new NumberOptionField(),
  //       },
  //     },
  //     dropShadow: {
  //       enabled: new BoolOptionField(),
  //       top: new NumberOptionField(),
  //       left: new NumberOptionField(),
  //       blur: new NumberOptionField(),
  //       opacity: new NumberOptionField(),
  //     },
  //   },
  //   tooltip: {
  //     enabled: new BoolOptionField(),
  //     formatter: null, // TODO(https://github.com/tran-simon/charts-web-app/issues/1): Support formatter custom functions
  //     offsetY: new NumberOptionField(),
  //     style: {
  //       fontSize: new TextOptionField(),
  //       fontFamily: new TextOptionField(),
  //     },
  //   },
  // },
};

export default apexOptionsModel;
