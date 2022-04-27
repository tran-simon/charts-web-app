import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const subtitle: Options<ApexOptions['subtitle']> = {
  text: new optionModel.TextOptionField(),
  align: new optionModel.SelectOptionField({
    left: { value: 'left', labelId: 'subtitle.align.option.left' },
    center: { value: 'center', labelId: 'subtitle.align.option.center' },
    right: { value: 'right', labelId: 'subtitle.align.option.right' },
  }),
  margin: new optionModel.NumberOptionField(),
  offsetX: new optionModel.NumberOptionField(),
  offsetY: new optionModel.NumberOptionField(),
  floating: new optionModel.BoolOptionField(),
  style: {
    fontSize: new optionModel.TextOptionField(),
    fontWeight: new optionModel.TextOptionField(),
    fontFamily: new optionModel.TextOptionField(),
    color: null,
  },
};

export default subtitle;
