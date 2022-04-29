import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const stroke: Options<ApexOptions['stroke']> = {
  show: new optionModel.BoolOptionField(),
  curve: new optionModel.SelectOptionField({
    smooth: { value: 'smooth', labelId: 'stroke.curve.option.smooth' },
    straight: { value: 'straight', labelId: 'stroke.curve.option.straight' },
    stepline: { value: 'stepline', labelId: 'stroke.curve.option.stepline' },
  }),
  lineCap: new optionModel.SelectOptionField({
    butt: { value: 'butt', labelId: 'stroke.lineCap.option.butt' },
    square: { value: 'square', labelId: 'stroke.lineCap.option.square' },
    round: { value: 'round', labelId: 'stroke.lineCap.option.round' },
  }),
  colors: null,
  width: null,
  dashArray: null,
};

export default stroke;
