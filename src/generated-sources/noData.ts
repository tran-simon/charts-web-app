import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const noData: Options<ApexOptions['noData']> = {
  text: new optionModel.TextOptionField(),
  align: new optionModel.SelectOptionField({
    left: { value: 'left', labelId: 'noData.align.option.left' },
    center: { value: 'center', labelId: 'noData.align.option.center' },
    right: { value: 'right', labelId: 'noData.align.option.right' },
  }),
  verticalAlign: new optionModel.SelectOptionField({
    top: { value: 'top', labelId: 'noData.verticalAlign.option.top' },
    middle: { value: 'middle', labelId: 'noData.verticalAlign.option.middle' },
    bottom: { value: 'bottom', labelId: 'noData.verticalAlign.option.bottom' },
  }),
  offsetX: new optionModel.NumberOptionField(),
  offsetY: new optionModel.NumberOptionField(),
  style: {
    color: null,
    fontSize: new optionModel.TextOptionField(),
    fontFamily: new optionModel.TextOptionField(),
  },
};

export default noData;
