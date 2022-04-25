import {
  ArrayOptionField,
  NumberOptionField,
  Options,
  TextOptionField,
} from '../optionModel';
import { ApexOptions } from 'apexcharts';

export enum TypeOption {
  line = 'line',
  area = 'area',
  bar = 'bar',
  histogram = 'histogram',
  pie = 'pie',
  donut = 'donut',
  radialBar = 'radialBar',
  scatter = 'scatter',
  bubble = 'bubble',
  heatmap = 'heatmap',
  treemap = 'treemap',
  boxPlot = 'boxPlot',
  candlestick = 'candlestick',
  radar = 'radar',
  polarArea = 'polarArea',
  rangeBar = 'rangeBar',
}

export interface IReactApex {
  type?: TypeOption;
  series?: ApexOptions['series'];
  width?: string | number;
  height?: string | number;
  options?: ApexOptions;
}

const apexAxisChartSeriesOptions: Options<ApexAxisChartSeries[number]> = {
  name: new TextOptionField(),
  type: new TextOptionField(),
  color: new TextOptionField(),
  data: new ArrayOptionField(new NumberOptionField()),
};
