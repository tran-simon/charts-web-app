import { ApexOptions } from 'apexcharts';
import { Options } from '../src/model/optionModel';
import * as optionModel from '../src/model/optionModel';

const dataLabels: Options<ApexOptions['dataLabels']> = {
  enabled: new optionModel.BoolOptionField(),
  enabledOnSeries: null,
  formatter: null,
  textAnchor: new optionModel.SelectOptionField({
    start: { value: 'start', labelId: 'dataLabels.textAnchor.option.start' },
    middle: { value: 'middle', labelId: 'dataLabels.textAnchor.option.middle' },
    end: { value: 'end', labelId: 'dataLabels.textAnchor.option.end' },
  }),
  distributed: new optionModel.BoolOptionField(),
  offsetX: new optionModel.NumberOptionField(),
  offsetY: new optionModel.NumberOptionField(),
  style: {
    fontSize: new optionModel.TextOptionField(),
    fontFamily: new optionModel.TextOptionField(),
    fontWeight: new optionModel.TextOptionField(),
    colors: null,
  },
  background: {
    enabled: new optionModel.BoolOptionField(),
    foreColor: null,
    borderRadius: new optionModel.NumberOptionField(),
    borderWidth: new optionModel.NumberOptionField(),
    borderColor: null,
    opacity: new optionModel.NumberOptionField(),
    dropShadow: {
      enabled: new optionModel.BoolOptionField(),
      top: new optionModel.NumberOptionField(),
      left: new optionModel.NumberOptionField(),
      blur: new optionModel.NumberOptionField(),
      color: null,
      opacity: new optionModel.NumberOptionField(),
    },
  },
  dropShadow: {
    enabled: new optionModel.BoolOptionField(),
    top: new optionModel.NumberOptionField(),
    left: new optionModel.NumberOptionField(),
    blur: new optionModel.NumberOptionField(),
    color: null,
    opacity: new optionModel.NumberOptionField(),
  },
};

export default dataLabels;
