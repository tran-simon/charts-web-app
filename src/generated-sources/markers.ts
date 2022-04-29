import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const markers: Options<ApexOptions['markers']> = {
  size: new optionModel.NumberOptionField(),
  colors: null,
  strokeColors: null,
  strokeWidth: null,
  strokeOpacity: null,
  strokeDashArray: null,
  fillOpacity: null,
  discrete: null,
  radius: new optionModel.NumberOptionField(),
  shape: new optionModel.SelectOptionField({
    circle: { value: 'circle', labelId: 'markers.shape.option.circle' },
    square: { value: 'square', labelId: 'markers.shape.option.square' },
  }),
  offsetX: new optionModel.NumberOptionField(),
  offsetY: new optionModel.NumberOptionField(),
  onClick: null,
  onDblClick: null,
  showNullDataPoints: new optionModel.BoolOptionField(),
  hover: {
    size: new optionModel.NumberOptionField(),
    sizeOffset: new optionModel.NumberOptionField(),
  },
};

export default markers;
