import {
  ArrayOptionField,
  BoolOptionField,
  NumberOptionField,
  Options,
  SelectOptionField,
  TextOptionField,
} from '../optionModel';
import { ApexOptions } from 'apexcharts';

enum AnnotationsPosition {
  front = 'front',
  back = 'back',
}

enum TitleAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}

const apexOptionsModel: Options<ApexOptions> = {
  annotations: {
    position: new SelectOptionField(
      AnnotationsPosition,
      AnnotationsPosition.front,
    ),
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
      color: new ArrayOptionField(new TextOptionField(), true),
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
  colors: new ArrayOptionField(new TextOptionField()),
  dataLabels: undefined,
  fill: undefined,
  forecastDataPoints: undefined,
  grid: undefined,
  labels: new ArrayOptionField(new TextOptionField()), // TODO: This causes a bug with line charts
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
    align: new SelectOptionField(TitleAlign, TitleAlign.left),
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
  xaxis: undefined,
  yaxis: undefined,
};

export default apexOptionsModel;
