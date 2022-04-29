import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const tooltip: Options<ApexOptions['tooltip']> = {
  enabled: new optionModel.BoolOptionField(),
  enabledOnSeries: null,
  shared: new optionModel.BoolOptionField(),
  followCursor: new optionModel.BoolOptionField(),
  intersect: new optionModel.BoolOptionField(),
  inverseOrder: new optionModel.BoolOptionField(),
  custom: null,
  fillSeriesColor: new optionModel.BoolOptionField(),
  theme: new optionModel.SelectOptionField({
    light: { value: 'light', labelId: 'tooltip.theme.option.light' },
    dark: { value: 'dark', labelId: 'tooltip.theme.option.dark' },
  }),
  style: {
    fontFamily: new optionModel.TextOptionField(),
    fontSize: new optionModel.TextOptionField(),
  },
  onDatasetHover: {
    highlightDataSeries: new optionModel.BoolOptionField(),
  },
  x: {
    show: new optionModel.BoolOptionField(),
    format: new optionModel.TextOptionField(),
    formatter: null,
  },
  y: {
    formatter: null,
    title: {
      formatter: null,
    },
  },
  z: {
    formatter: null,
    title: new optionModel.TextOptionField(),
  },
  marker: {
    show: new optionModel.BoolOptionField(),
  },
  items: {
    display: new optionModel.TextOptionField(),
  },
  fixed: {
    enabled: new optionModel.BoolOptionField(),
    position: new optionModel.SelectOptionField({
      topLeft: {
        value: 'topLeft',
        labelId: 'tooltip.fixed.position.option.topLeft',
      },
      topRight: {
        value: 'topRight',
        labelId: 'tooltip.fixed.position.option.topRight',
      },
      bottomLeft: {
        value: 'bottomLeft',
        labelId: 'tooltip.fixed.position.option.bottomLeft',
      },
      bottomRight: {
        value: 'bottomRight',
        labelId: 'tooltip.fixed.position.option.bottomRight',
      },
    }),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
};

export default tooltip;
