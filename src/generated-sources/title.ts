import { ApexOptions } from 'apexcharts';
import { Options } from '../model/optionModel';
import * as optionModel from '../model/optionModel';

const title: Options<ApexOptions['title']> = {
  text: new optionModel.TextOptionField(),
  align: new optionModel.SelectOptionField({
    left: { value: 'left', labelId: 'title.align.option.left' },
    center: { value: 'center', labelId: 'title.align.option.center' },
    right: { value: 'right', labelId: 'title.align.option.right' },
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

export default title;
