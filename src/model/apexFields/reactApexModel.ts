import {
  ListOptionField,
  NumberOptionField,
  Options,
  SelectOptionField,
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

export const apexAxisChartSeriesOptions: Options<ApexAxisChartSeries[number]> =
  {
    name: new TextOptionField({
      disableClearable: true,
    }),
    type: new SelectOptionField(
      {
        line: {
          labelId: 'ChartPropsContext.series.type.option.line',
          value: 'line',
        },
        area: {
          labelId: 'ChartPropsContext.series.type.option.area',
          value: 'area',
        },
        column: {
          labelId: 'ChartPropsContext.series.type.option.column',
          value: 'column',
        },
        bar: {
          labelId: 'ChartPropsContext.series.type.option.bar',
          value: 'bar',
        },
        scatter: {
          labelId: 'ChartPropsContext.series.type.option.scatter',
          value: 'scatter',
        },
        bubble: {
          labelId: 'ChartPropsContext.series.type.option.bubble',
          value: 'bubble',
        },
      },
      {
        disableClearable: true,
      },
    ),
    color: new TextOptionField(),
    data: new ListOptionField(new NumberOptionField()),
  };
