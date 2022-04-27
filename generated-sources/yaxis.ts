import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const yaxis: Options<ApexOptions['yaxis']> = {
  show: new optionModel.BoolOptionField(),
  showAlways: new optionModel.BoolOptionField(),
  showForNullSeries: new optionModel.BoolOptionField(),
  seriesName: new optionModel.TextOptionField(),
  opposite: new optionModel.BoolOptionField(),
  reversed: new optionModel.BoolOptionField(),
  logarithmic: new optionModel.BoolOptionField(),
  logBase: new optionModel.NumberOptionField(),
  tickAmount: new optionModel.NumberOptionField(),
  min: new optionModel.NumberOptionField(),
  max: new optionModel.NumberOptionField(),
  forceNiceScale: new optionModel.BoolOptionField(),
  floating: new optionModel.BoolOptionField(),
  decimalsInFloat: new optionModel.NumberOptionField(),
  labels: {
    show: new optionModel.BoolOptionField(),
    align: new optionModel.SelectOptionField({
      left: { value: 'left', labelId: 'yaxis.labels.align.option.left' },
      center: { value: 'center', labelId: 'yaxis.labels.align.option.center' },
      right: { value: 'right', labelId: 'yaxis.labels.align.option.right' },
    }),
    minWidth: new optionModel.NumberOptionField(),
    maxWidth: new optionModel.NumberOptionField(),
    style: {
      colors: null,
      fontSize: new optionModel.TextOptionField(),
      fontFamily: new optionModel.TextOptionField(),
      fontWeight: new optionModel.TextOptionField(),
      cssClass: new optionModel.TextOptionField(),
    },
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
    rotate: new optionModel.NumberOptionField(),
    formatter: null,
  },
  axisBorder: {
    show: new optionModel.BoolOptionField(),
    color: null,
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
  axisTicks: {
    show: new optionModel.BoolOptionField(),
    color: null,
    width: new optionModel.BoolOptionField(),
    offsetX: new optionModel.NumberOptionField(),
    offsetY: new optionModel.NumberOptionField(),
  },
  title: {
    text: new optionModel.TextOptionField(),
    rotate: new optionModel.NumberOptionField(),
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
    position: new optionModel.SelectOptionField({
      back: { value: 'back', labelId: 'yaxis.crosshairs.position.option.back' },
      front: {
        value: 'front',
        labelId: 'yaxis.crosshairs.position.option.front',
      },
    }),
    stroke: {
      color: null,
      width: null,
      dashArray: null,
    },
  },
  tooltip: {
    enabled: new optionModel.BoolOptionField(),
    offsetX: new optionModel.NumberOptionField(),
  },
};

export default yaxis;
