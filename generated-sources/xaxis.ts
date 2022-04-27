import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const xaxis: Options<ApexOptions['xaxis']> = {
  type: new optionModel.SelectOptionField({
    category: { value: 'category', labelId: 'xaxis.type.option.category' },
    datetime: { value: 'datetime', labelId: 'xaxis.type.option.datetime' },
    numeric: { value: 'numeric', labelId: 'xaxis.type.option.numeric' },
  }),
  categories: null,
  tickAmount: new optionModel.NumberOptionField(),
  tickPlacement: new optionModel.SelectOptionField({
    between: {
      value: 'between',
      labelId: 'xaxis.tickPlacement.option.between',
    },
    on: { value: 'on', labelId: 'xaxis.tickPlacement.option.on' },
  }),
  min: new optionModel.NumberOptionField(),
  max: new optionModel.NumberOptionField(),
  range: new optionModel.NumberOptionField(),
  floating: new optionModel.BoolOptionField(),
  decimalsInFloat: new optionModel.NumberOptionField(),
  overwriteCategories: null,
  position: new optionModel.SelectOptionField({
    bottom: { value: 'bottom', labelId: 'xaxis.position.option.bottom' },
    top: { value: 'top', labelId: 'xaxis.position.option.top' },
  }),
  labels: {
    show: new optionModel.BoolOptionField(),
    rotate: new optionModel.NumberOptionField(),
    rotateAlways: new optionModel.BoolOptionField(),
    hideOverlappingLabels: new optionModel.BoolOptionField(),
    showDuplicates: new optionModel.BoolOptionField(),
    trim: new optionModel.BoolOptionField(),
    minHeight: new optionModel.NumberOptionField(),
    maxHeight: new optionModel.NumberOptionField(),
    style: {
      colors: null,
      fontSize: new optionModel.TextOptionField(),
      fontFamily: new optionModel.TextOptionField(),
      fontWeight: new optionModel.TextOptionField(),
      cssClass: new optionModel.TextOptionField(),
    },
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
    format: new optionModel.TextOptionField(),
    formatter: {
      undefined: {
        _isDocValue: true,
        path: [xaxis, labels, formatter, null],
      },
    },
    datetimeUTC: new optionModel.BoolOptionField(),
    datetimeFormatter: {
      year: new optionModel.TextOptionField(),
      month: new optionModel.TextOptionField(),
      day: new optionModel.TextOptionField(),
      hour: new optionModel.TextOptionField(),
    },
  },
  axisBorder: {
    show: new optionModel.BoolOptionField(),
    color: null,
    height: new optionModel.NumberOptionField(),
    width: new optionModel.TextOptionField(),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
  axisTicks: {
    show: new optionModel.BoolOptionField(),
    borderType: new optionModel.SelectOptionField({
      solid: {
        value: 'solid',
        labelId: 'xaxis.axisTicks.borderType.option.solid',
      },
      dotted: {
        value: 'dotted',
        labelId: 'xaxis.axisTicks.borderType.option.dotted',
      },
    }),
    color: null,
    height: new optionModel.BoolOptionField(),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
  title: {
    text: new optionModel.TextOptionField(),
    offsetX: new optionModel.TextOptionField(),
    offsetY: new optionModel.TextOptionField(),
    style: {
      color: null,
      fontSize: new optionModel.TextOptionField(),
      fontFamily: new optionModel.TextOptionField(),
      fontWeight: new optionModel.TextOptionField(),
      cssClass: new optionModel.TextOptionField(),
    },
  },
  crosshairs: {
    show: new optionModel.BoolOptionField(),
    width: new optionModel.NumberOptionField(),
    position: new optionModel.SelectOptionField({
      back: { value: 'back', labelId: 'xaxis.crosshairs.position.option.back' },
      front: {
        value: 'front',
        labelId: 'xaxis.crosshairs.position.option.front',
      },
    }),
    opacity: new optionModel.NumberOptionField(),
    stroke: {
      color: null,
      width: new optionModel.NumberOptionField(),
      dashArray: new optionModel.NumberOptionField(),
    },
    fill: {
      type: new optionModel.SelectOptionField({
        solid: {
          value: 'solid',
          labelId: 'xaxis.crosshairs.fill.type.option.solid',
        },
        gradient: {
          value: 'gradient',
          labelId: 'xaxis.crosshairs.fill.type.option.gradient',
        },
      }),
      color: new optionModel.TextOptionField(),
      gradient: {
        colorFrom: null,
        colorTo: null,
        stops: null,
        opacityFrom: new optionModel.NumberOptionField(),
        opacityTo: new optionModel.NumberOptionField(),
      },
    },
    dropShadow: {
      enabled: new optionModel.BoolOptionField(),
      top: new optionModel.NumberOptionField(),
      left: new optionModel.NumberOptionField(),
      blur: new optionModel.NumberOptionField(),
      opacity: new optionModel.NumberOptionField(),
    },
  },
  tooltip: {
    enabled: new optionModel.BoolOptionField(),
    formatter: null,
    offsetY: new optionModel.NumberOptionField(),
    style: {
      fontSize: new optionModel.TextOptionField(),
      fontFamily: new optionModel.TextOptionField(),
    },
  },
};

export default xaxis;
