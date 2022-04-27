import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const grid: Options<ApexOptions['grid']> = {
  show: new optionModel.BoolOptionField(),
  borderColor: new optionModel.TextOptionField(),
  strokeDashArray: new optionModel.NumberOptionField(),
  position: new optionModel.SelectOptionField({
    front: { value: 'front', labelId: 'grid.position.option.front' },
    back: { value: 'back', labelId: 'grid.position.option.back' },
  }),
  xaxis: {
    lines: {
      show: new optionModel.BoolOptionField(),
    },
  },
  yaxis: {
    lines: {
      show: new optionModel.BoolOptionField(),
    },
  },
  row: {
    colors: null,
    opacity: new optionModel.NumberOptionField(),
  },
  column: {
    colors: null,
    opacity: new optionModel.NumberOptionField(),
  },
  padding: {
    top: new optionModel.NumberOptionField(),
    right: new optionModel.NumberOptionField(),
    bottom: new optionModel.NumberOptionField(),
    left: new optionModel.NumberOptionField(),
  },
};

export default grid;
